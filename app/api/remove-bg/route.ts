import { NextRequest, NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, publicId } = await req.json()

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, message: 'Image URL is required.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.REMOVE_BG_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: 'Remove.bg API key not configured.' },
        { status: 500 }
      )
    }

    // Download the image first
    const imageRes = await fetch(imageUrl)
    if (!imageRes.ok) {
      throw new Error('Failed to download image')
    }
    const imageBuffer = Buffer.from(await imageRes.arrayBuffer())

    // Call remove.bg API
    const formData = new FormData()
    const blob = new Blob([imageBuffer], { type: 'image/png' })
    formData.append('image_file', blob, 'image.png')

    const rbgRes = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: { 'X-Api-Key': apiKey },
      body: formData
    })

    if (!rbgRes.ok) {
      const errorText = await rbgRes.text()
      console.error('Remove.bg error:', errorText)
      return NextResponse.json(
        { success: false, message: `Remove.bg failed: ${rbgRes.statusText}` },
        { status: 502 }
      )
    }

    // Get the result as buffer
    const rbgBuffer = Buffer.from(await rbgRes.arrayBuffer())

    // Upload to Cloudinary
    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'nk-car-showroom/vehicles/no-bg',
            resource_type: 'image',
            public_id: publicId ? `${publicId}_no_bg` : undefined
          },
          (error, result) => {
            if (error) return reject(error)
            resolve(result)
          }
        )
        .end(rbgBuffer)
    })

    // Delete the original image from Cloudinary
    if (publicId) {
      cloudinary.uploader.destroy(publicId).catch(err => {
        console.error('Failed to delete original image:', err)
      })
    }

    return NextResponse.json({
      success: true,
      image: {
        url: upload.secure_url,
        publicId: upload.public_id,
        width: upload.width,
        height: upload.height,
        format: upload.format
      }
    })
  } catch (error) {
    console.error('Remove.bg API error:', error)
    return NextResponse.json(
      { success: false, message: 'Remove.bg processing failed.' },
      { status: 500 }
    )
  }
}