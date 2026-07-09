import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/jwt'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized'
        },
        { status: 401 }
      )
    }

    const payload = await verifyToken(token)

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        mobile: true,
        role: true,
        avatar: true,
        city: true,
        state: true
      }
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found.'
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Unauthorized'
      },
      { status: 401 }
    )
  }
}