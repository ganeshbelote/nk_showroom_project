import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import cloudinary from '@/lib/cloudinary'

export async function GET(
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{ slug: string }>
  }
) {
  try {
    const { slug } = await params

    const vehicle = await prisma.vehicle.findUnique({
      where: {
        slug
      },

      include: {
        images: {
          orderBy: {
            order: 'asc'
          }
        },

        variants: true,

        features: true,

        reviews: {
          where: {
            approved: true
          },

          include: {
            user: {
              select: {
                fullName: true,
                avatar: true
              }
            }
          },

          orderBy: {
            createdAt: 'desc'
          }
        },

        _count: {
          select: {
            reviews: true,
            wishlists: true
          }
        }
      }
    })

    if (!vehicle) {
      return NextResponse.json(
        {
          success: false,
          message: 'Vehicle not found.'
        },
        {
          status: 404
        }
      )
    }

    return NextResponse.json({
      success: true,
      vehicle
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error'
      },
      {
        status: 500
      }
    )
  }
}

const variantSchema = z.object({
  name: z.string(),
  price: z.number(),
  fuel: z.string(),
  transmission: z.string()
})

const imageSchema = z.object({
  imageUrl: z.string().url(),
  publicId: z.string(),
  isCover: z.boolean().optional(),
  order: z.number().optional()
})

const vehicleSchema = z.object({
  name: z.string(),

  brand: z.string(),

  category: z.string(),

  bodyType: z.string(),

  description: z.string(),

  basePrice: z.number(),

  mileage: z.string(),

  cityMileage: z.string().optional(),

  fuelType: z.string(),

  engine: z.string(),

  power: z.string(),

  torque: z.string(),

  transmission: z.string(),

  cylinders: z.number(),

  seatingCapacity: z.number(),

  fuelTank: z.string(),

  bootSpace: z.string(),

  groundClearance: z.string(),

  featured: z.boolean(),

  published: z.boolean(),

  features: z.array(z.string()),

  variants: z.array(variantSchema),

  images: z.array(imageSchema)
})

export async function PATCH(
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{ slug: string }>
  }
) {
  try {
    const { slug } = await params

    const body = await req.json()

    const result = vehicleSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten()
        },
        {
          status: 400
        }
      )
    }

    const data = result.data

    const exists = await prisma.vehicle.findUnique({
      where: {
        slug
      },

      include: {
        images: true
      }
    })

    if (!exists) {
      return NextResponse.json(
        {
          success: false,
          message: 'Vehicle not found.'
        },
        {
          status: 404
        }
      )
    }

    const vehicle = await prisma.$transaction(async tx => {
      await tx.feature.deleteMany({
        where: {
          vehicleId: exists.id
        }
      })

      await tx.variant.deleteMany({
        where: {
          vehicleId: exists.id
        }
      })

      await tx.vehicleImage.deleteMany({
        where: {
          vehicleId: exists.id
        }
      })

      return tx.vehicle.update({
        where: {
          id: exists.id
        },

        data: {
          ...data,

          features: {
            create: data.features.map(name => ({
              name
            }))
          },

          variants: {
            create: data.variants
          },

          images: {
            create: data.images
          }
        },

        include: {
          images: true,
          variants: true,
          features: true
        }
      })
    })

    return NextResponse.json({
      success: true,
      vehicle
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error'
      },
      {
        status: 500
      }
    )
  }
}


export async function DELETE(
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{ slug: string }>
  }
) {
  try {
    const { slug } = await params

    const vehicle = await prisma.vehicle.findUnique({
      where: {
        slug
      },

      include: {
        images: true
      }
    })

    if (!vehicle) {
      return NextResponse.json(
        {
          success: false,
          message: 'Vehicle not found.'
        },
        {
          status: 404
        }
      )
    }

    for (const image of vehicle.images) {
      await cloudinary.uploader.destroy(image.publicId)
    }

    await prisma.vehicle.delete({
      where: {
        id: vehicle.id
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Vehicle deleted successfully.'
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error'
      },
      {
        status: 500
      }
    )
  }
}