import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET (req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const idsParam = searchParams.get('ids')

    if (!idsParam) {
      return NextResponse.json(
        { success: false, message: 'No vehicle IDs provided' },
        { status: 400 }
      )
    }

    const ids = idsParam.split(',').filter(Boolean)

    if (ids.length < 2 || ids.length > 3) {
      return NextResponse.json(
        { success: false, message: 'Provide 2-3 vehicle IDs' },
        { status: 400 }
      )
    }

    const vehicles = await prisma.vehicle.findMany({
      where: {
        id: { in: ids }
      },
      include: {
        images: {
          orderBy: { order: 'asc' }
        },
        variants: true,
        features: true,
        _count: {
          select: { reviews: true }
        }
      }
    })

    // Maintain the order from the URL params
    const ordered = ids.map(id => vehicles.find(v => v.id === id)).filter(Boolean)

    return NextResponse.json({ success: true, vehicles: ordered })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}