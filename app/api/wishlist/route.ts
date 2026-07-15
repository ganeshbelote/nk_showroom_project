import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/jwt'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await verifyToken(token)
    const vehicleId = req.nextUrl.searchParams.get('vehicleId')

    const where: { userId: string; vehicleId?: string } = { userId: user.id }

    if (vehicleId) {
      where.vehicleId = vehicleId
    }

    const wishlist = await prisma.wishlist.findMany({ where })

    if (vehicleId) {
      return NextResponse.json({
        success: true,
        isWishlisted: wishlist.length > 0,
        wishlist: wishlist[0] || null
      })
    }

    // Fetch full vehicle details for wishlist items
    const wishlistWithVehicles = await prisma.wishlist.findMany({
      where: { userId: user.id },
      include: {
        vehicle: {
          select: {
            id: true,
            name: true,
            slug: true,
            basePrice: true,
            mileage: true,
            fuelType: true,
            transmission: true,
            images: {
              where: { isCover: true },
              take: 1,
              select: { imageUrl: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      wishlist: wishlistWithVehicles
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await verifyToken(token)
    const { vehicleId } = await req.json()

    if (!vehicleId) {
      return NextResponse.json(
        { success: false, message: 'vehicleId is required' },
        { status: 400 }
      )
    }

    // Check if vehicle exists
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    })

    if (!vehicle) {
      return NextResponse.json(
        { success: false, message: 'Vehicle not found' },
        { status: 404 }
      )
    }

    // Check if already in wishlist
    const existing = await prisma.wishlist.findUnique({
      where: {
        userId_vehicleId: {
          userId: user.id,
          vehicleId
        }
      }
    })

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Already in wishlist',
        isWishlisted: true
      })
    }

    const wishlist = await prisma.wishlist.create({
      data: {
        userId: user.id,
        vehicleId
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Added to wishlist',
        wishlist,
        isWishlisted: true
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await verifyToken(token)
    const vehicleId = req.nextUrl.searchParams.get('vehicleId')

    if (!vehicleId) {
      return NextResponse.json(
        { success: false, message: 'vehicleId is required' },
        { status: 400 }
      )
    }

    await prisma.wishlist.delete({
      where: {
        userId_vehicleId: {
          userId: user.id,
          vehicleId
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Removed from wishlist',
      isWishlisted: false
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}