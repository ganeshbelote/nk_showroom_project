import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/jwt'
import { hashPassword } from '@/lib/auth'

const updateSchema = z.object({
  fullName: z.string().min(2).optional(),
  email: z.string().email().optional(),
  mobile: z.string().min(10).max(15).optional(),
  password: z.string().min(8).optional(),

  gender: z.string().optional(),
  dob: z.string().optional(),

  occupation: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),

  budget: z.string().optional(),
  preferredFuel: z.string().optional(),
  preferredBody: z.string().optional()
})

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const payload = await verifyToken(token)
    const body = await req.json()

    const result = updateSchema.safeParse(body)

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

    // If email is being updated, check uniqueness
    if (data.email) {
      const existingEmail = await prisma.user.findFirst({
        where: {
          email: data.email,
          id: { not: payload.id }
        }
      })

      if (existingEmail) {
        return NextResponse.json(
          { success: false, message: 'Email already in use.' },
          { status: 409 }
        )
      }
    }

    // If mobile is being updated, check uniqueness
    if (data.mobile) {
      const existingMobile = await prisma.user.findFirst({
        where: {
          mobile: data.mobile,
          id: { not: payload.id }
        }
      })

      if (existingMobile) {
        return NextResponse.json(
          { success: false, message: 'Mobile number already in use.' },
          { status: 409 }
        )
      }
    }

    // Build update payload
    const updateData: Record<string, unknown> = {}

    if (data.fullName) updateData.fullName = data.fullName
    if (data.email) updateData.email = data.email
    if (data.mobile) updateData.mobile = data.mobile
    if (data.password) updateData.password = await hashPassword(data.password)
    if (data.gender !== undefined) updateData.gender = data.gender
    if (data.dob !== undefined) updateData.dob = data.dob ? new Date(data.dob) : null
    if (data.occupation !== undefined) updateData.occupation = data.occupation
    if (data.city !== undefined) updateData.city = data.city
    if (data.state !== undefined) updateData.state = data.state
    if (data.budget !== undefined) updateData.budget = data.budget
    if (data.preferredFuel !== undefined) updateData.preferredFuel = data.preferredFuel
    if (data.preferredBody !== undefined) updateData.preferredBody = data.preferredBody

    const user = await prisma.user.update({
      where: { id: payload.id },
      data: updateData,
      select: {
        id: true,
        fullName: true,
        email: true,
        mobile: true,
        role: true,
        avatar: true,
        gender: true,
        dob: true,
        occupation: true,
        city: true,
        state: true,
        budget: true,
        preferredFuel: true,
        preferredBody: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully.',
      user
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    )
  }
}