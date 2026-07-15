import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany()
    const map: Record<string, string> = {}
    settings.forEach(s => { map[s.key] = s.value })

    return NextResponse.json({ success: true, settings: map })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch settings.' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, string>

    // Upsert each setting
    for (const [key, value] of Object.entries(body)) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      })
    }

    return NextResponse.json({ success: true, message: 'Settings saved.' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Failed to save settings.' },
      { status: 500 }
    )
  }
}