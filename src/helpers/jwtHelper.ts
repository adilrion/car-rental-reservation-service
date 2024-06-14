import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

const createToken = (
  payload: object,
  secret: Secret,
  options: string,
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: options,
  })
}

const verifyToken = (token: string, refreshSecret: Secret): JwtPayload => {
  return jwt.verify(token, refreshSecret) as JwtPayload
}

export const jwtHelper = {
  createToken,
  verifyToken,
}
