import { NextRequest, NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const file = formData.get('file') as File | null
    const folder =
      (formData.get('folder') as string) || 'general'

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: 'No file uploaded.'
        },
        {
          status: 400
        }
      )
    }

    const bytes = await file.arrayBuffer()

    const buffer = Buffer.from(bytes)

    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `nk-car-showroom/${folder}`,
            resource_type: 'image'
          },
          (error, result) => {
            if (error) return reject(error)

            resolve(result)
          }
        )
        .end(buffer)
    })

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
    console.log(error)

    return NextResponse.json(
      {
        success: false,
        message: 'Upload failed.'
      },
      {
        status: 500
      }
    )
  }
}