import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/jwt'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    let payload
    try {
      payload = await verifyToken(token)
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 })
    }

    const admin = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { role: true }
    })
    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''

    // Build where clause safely
    const where: any = { role: 'USER' }
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } },
        { mobile: { contains: search } }
      ]
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        fullName: true,
        email: true,
        mobile: true,
        iscontacted: true,
        createdAt: true,
        city: true,
        state: true,
        budget: true,
        preferredFuel: true,
        preferredBody: true
      },
      orderBy: { createdAt: 'desc' }
    })

    const visitors = users.map(u => ({
      id: u.id,
      name: u.fullName,
      phone: u.mobile,
      email: u.email,
      interested: u.preferredFuel
        ? `${u.preferredFuel}${u.preferredBody ? ` | ${u.preferredBody}` : ''}`
        : 'Not specified',
      message: u.budget ? `Budget: ${u.budget}` : null,
      status: u.iscontacted ? 'Contacted' : 'New',
      city: u.city,
      state: u.state,
      createdAt: u.createdAt.toISOString()
    }))

    return NextResponse.json({ success: true, visitors })
  } catch (error: any) {
    console.error('Visitors GET error:', error?.message || error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch visitors.' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    let payload
    try {
      payload = await verifyToken(token)
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 })
    }

    const admin = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { role: true }
    })
    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { id, status } = body

    if (!id) {
      return NextResponse.json({ success: false, message: 'User ID is required.' }, { status: 400 })
    }

    const iscontacted = status === 'Contacted' || status === 'Visited' || status === 'Closed'

    await prisma.user.update({
      where: { id },
      data: { iscontacted },
      select: { id: true } // Don't return full user to avoid serialization issues
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Visitors PATCH error:', error?.message || error)
    return NextResponse.json(
      { success: false, message: 'Failed to update visitor.' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    let payload
    try {
      payload = await verifyToken(token)
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 })
    }

    const admin = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { role: true }
    })
    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, message: 'User ID is required.' }, { status: 400 })
    }

    await prisma.user.update({
      where: { id },
      data: { iscontacted: true },
      select: { id: true }
    })

    return NextResponse.json({ success: true, message: 'User marked as contacted.' })
  } catch (error: any) {
    console.error('Visitors DELETE error:', error?.message || error)
    return NextResponse.json(
      { success: false, message: 'Failed to update.' },
      { status: 500 }
    )
  }
}