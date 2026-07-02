import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import {
  comparePassword,
  generateToken
} from '@/lib/auth'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const result = loginSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid credentials.'
        },
        { status: 400 }
      )
    }

    const { email, password } = result.data

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password.'
        },
        { status: 401 }
      )
    }

    const matched = await comparePassword(
      password,
      user.password
    )

    if (!matched) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password.'
        },
        { status: 401 }
      )
    }

    const token = generateToken({
      id: user.id,
      role: user.role
    })

    const response = NextResponse.json({
      success: true,
      message: 'Login successful.',
      redirect:
        user.role === 'ADMIN'
          ? '/admin'
          : '/account'
    })

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return response
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error.'
      },
      { status: 500 }
    )
  }
}