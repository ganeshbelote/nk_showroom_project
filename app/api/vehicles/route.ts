import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export async function GET (req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 10
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')
    const featured = searchParams.get('featured')
    const published = searchParams.get('published')

    const where = {
      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive' as const
            }
          },
          {
            brand: {
              contains: search,
              mode: 'insensitive' as const
            }
          }
        ]
      }),

      ...(category && {
        category
      }),

      ...(brand && {
        brand
      }),

      ...(featured && {
        featured: featured === 'true'
      }),

      ...(published && {
        published: published === 'true'
      })
    }

    const vehicles = await prisma.vehicle.findMany({
      where,

      include: {
        images: {
          orderBy: {
            order: 'asc'
          }
        },
        variants: true,
        features: true,
        _count: {
          select: {
            reviews: true,
            wishlists: true
          }
        }
      },

      orderBy: {
        createdAt: 'desc'
      },

      skip: (page - 1) * limit,

      take: limit
    })

    const total = await prisma.vehicle.count({
      where
    })

    return NextResponse.json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      vehicles
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch vehicles.'
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
  name: z.string().min(1),
  slug: z.string().min(1),

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

  featured: z.boolean().optional(),

  published: z.boolean().optional(),

  features: z.array(z.string()),

  variants: z.array(variantSchema),

  images: z.array(imageSchema)
})

export async function POST (req: NextRequest) {
  try {
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
        slug: data.slug
      }
    })

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: 'Slug already exists.'
        },
        {
          status: 409
        }
      )
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        name: data.name,
        slug: data.slug,

        brand: data.brand,
        category: data.category,
        bodyType: data.bodyType,

        description: data.description,

        basePrice: data.basePrice,

        mileage: data.mileage,
        cityMileage: data.cityMileage,

        fuelType: data.fuelType,

        engine: data.engine,
        power: data.power,
        torque: data.torque,

        transmission: data.transmission,

        cylinders: data.cylinders,

        seatingCapacity: data.seatingCapacity,

        fuelTank: data.fuelTank,

        bootSpace: data.bootSpace,

        groundClearance: data.groundClearance,

        featured: data.featured ?? false,

        published: data.published ?? true,

        features: {
          create: data.features.map(name => ({
            name
          }))
        },

        variants: {
          create: data.variants.map(variant => ({
            name: variant.name,
            price: variant.price,
            fuel: variant.fuel,
            transmission: variant.transmission
          }))
        },

        images: {
          create: data.images.map(image => ({
            imageUrl: image.imageUrl,
            publicId: image.publicId,
            isCover: image.isCover ?? false,
            order: image.order ?? 0
          }))
        }
      },

      include: {
        features: true,
        variants: true,
        images: true
      }
    })

    return NextResponse.json(
      {
        success: true,
        vehicle
      },
      {
        status: 201
      }
    )
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
