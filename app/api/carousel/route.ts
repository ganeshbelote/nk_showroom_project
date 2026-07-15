import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const slideSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string(),
  price: z.string(),
  button: z.string(),
  image: z.string(),
  order: z.number().optional(),
  active: z.boolean().optional()
})

export async function GET() {
  try {
    const slides = await prisma.carouselSlide.findMany({
      orderBy: { order: 'asc' }
    })

    return NextResponse.json({ success: true, slides })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch slides.' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = slideSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten() },
        { status: 400 }
      )
    }

    const data = result.data

    // Get max order
    const maxOrder = await prisma.carouselSlide.aggregate({
      _max: { order: true }
    })

    const slide = await prisma.carouselSlide.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        price: data.price,
        button: data.button,
        image: data.image,
        order: data.order ?? (maxOrder._max.order ?? -1) + 1,
        active: data.active ?? true
      }
    })

    return NextResponse.json({ success: true, slide }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Failed to create slide.' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Slide ID is required.' },
        { status: 400 }
      )
    }

    const slide = await prisma.carouselSlide.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({ success: true, slide })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Failed to update slide.' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Slide ID is required.' },
        { status: 400 }
      )
    }

    await prisma.carouselSlide.delete({ where: { id } })

    return NextResponse.json({ success: true, message: 'Slide deleted.' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete slide.' },
      { status: 500 }
    )
  }
}