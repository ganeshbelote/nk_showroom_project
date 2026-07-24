import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/jwt'
import { z } from 'zod'

const onRoadPriceSchema = z.object({
  vehicleId: z.string(),
  variantId: z.string().optional().default(''),
  exShowroomPrice: z.coerce.number(),
  insurance: z.coerce.number(),
  rtoTax: z.coerce.number(),
  registrationFees: z.coerce.number(),
  fastag: z.coerce.number(),
  extendedWarranty: z.coerce.number().optional().default(0),
  autoCard: z.coerce.number().optional().default(0),
  numberPlateGarnish: z.coerce.number().optional().default(0),
  accessories: z.coerce.number().optional().default(0),
  tcs: z.coerce.number(),
  discount: z.coerce.number().optional().default(0),
  totalBeforeDiscount: z.coerce.number(),
  finalOnRoadPrice: z.coerce.number()
})

// GET /api/on-road-price?vehicleId=xxx&variantId=xxx
export async function GET (req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    const payload = await verifyToken(token)

    const { searchParams } = new URL(req.url)
    const vehicleId = searchParams.get('vehicleId')
    const variantId = searchParams.get('variantId') || ''

    if (!vehicleId) {
      return NextResponse.json({ success: false, message: 'vehicleId is required' }, { status: 400 })
    }

    const price = await prisma.onRoadPrice.findUnique({
      where: {
        vehicleId_userId_variantId: {
          vehicleId,
          userId: payload.id,
          variantId
        }
      }
    })

    return NextResponse.json({ success: true, price })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/on-road-price
export async function POST (req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    const payload = await verifyToken(token)

    const body = await req.json()
    const result = onRoadPriceSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ success: false, errors: result.error.flatten() }, { status: 400 })
    }

    const data = result.data
    const variantId = data.variantId || ''

    // Upsert: create or update
    const price = await prisma.onRoadPrice.upsert({
      where: {
        vehicleId_userId_variantId: {
          vehicleId: data.vehicleId,
          userId: payload.id,
          variantId
        }
      },
      update: {
        exShowroomPrice: data.exShowroomPrice,
        insurance: data.insurance,
        rtoTax: data.rtoTax,
        registrationFees: data.registrationFees,
        fastag: data.fastag,
        extendedWarranty: data.extendedWarranty,
        autoCard: data.autoCard,
        numberPlateGarnish: data.numberPlateGarnish,
        accessories: data.accessories,
        tcs: data.tcs,
        discount: data.discount,
        totalBeforeDiscount: data.totalBeforeDiscount,
        finalOnRoadPrice: data.finalOnRoadPrice
      },
      create: {
        vehicleId: data.vehicleId,
        variantId,
        userId: payload.id,
        exShowroomPrice: data.exShowroomPrice,
        insurance: data.insurance,
        rtoTax: data.rtoTax,
        registrationFees: data.registrationFees,
        fastag: data.fastag,
        extendedWarranty: data.extendedWarranty,
        autoCard: data.autoCard,
        numberPlateGarnish: data.numberPlateGarnish,
        accessories: data.accessories,
        tcs: data.tcs,
        discount: data.discount,
        totalBeforeDiscount: data.totalBeforeDiscount,
        finalOnRoadPrice: data.finalOnRoadPrice
      }
    })

    return NextResponse.json({ success: true, price }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
  }
}