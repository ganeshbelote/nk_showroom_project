import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const visitorSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(10),
  email: z.string().email(),
  interested: z.string(),
  message: z.string().optional(),
  status: z.string().optional()
})

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
            { phone: { contains: search } }
          ]
        }
      : {}

    const visitors = await prisma.visitor.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ success: true, visitors })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch visitors.' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = visitorSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten() },
        { status: 400 }
      )
    }

    const visitor = await prisma.visitor.create({
      data: result.data
    })

    return NextResponse.json({ success: true, visitor }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Failed to create visitor.' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Visitor ID is required.' },
        { status: 400 }
      )
    }

    const visitor = await prisma.visitor.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({ success: true, visitor })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Failed to update visitor.' },
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
        { success: false, message: 'Visitor ID is required.' },
        { status: 400 }
      )
    }

    await prisma.visitor.delete({ where: { id } })

    return NextResponse.json({ success: true, message: 'Visitor deleted.' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete visitor.' },
      { status: 500 }
    )
  }
}