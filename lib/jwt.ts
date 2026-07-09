import { JWTPayload, SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export interface JwtPayload extends JWTPayload {
  id: string
  role: 'USER' | 'ADMIN'
}

export async function generateToken(payload: JwtPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256'
    })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
}

export async function verifyToken(
  token: string
): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, secret)

  return payload as JwtPayload
}