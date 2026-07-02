import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  mobile: z.string().min(10).max(15),
  password: z.string().min(8),

  gender: z.string().optional(),
  dob: z.string().optional(),

  occupation: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),

  budget: z.string().optional(),
  preferredFuel: z.string().optional(),
  preferredBody: z.string().optional()
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const result = registerSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid input.',
          errors: result.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    const data = result.data

    const existingEmail = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    })

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email already exists.'
        },
        { status: 409 }
      )
    }

    const existingMobile = await prisma.user.findUnique({
      where: {
        mobile: data.mobile
      }
    })

    if (existingMobile) {
      return NextResponse.json(
        {
          success: false,
          message: 'Mobile number already exists.'
        },
        { status: 409 }
      )
    }

    const hashedPassword = await hashPassword(data.password)

    const user = await prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        mobile: data.mobile,
        password: hashedPassword,

        gender: data.gender,

        dob: data.dob ? new Date(data.dob) : undefined,

        occupation: data.occupation,
        city: data.city,
        state: data.state,

        budget: data.budget,
        preferredFuel: data.preferredFuel,
        preferredBody: data.preferredBody
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful.',
        user
      },
      { status: 201 }
    )
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