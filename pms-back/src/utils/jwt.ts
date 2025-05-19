import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "kabaye";

export interface JwtPayload {
  email: string;
  id: number;
  role: string;
}

export function generateToken(user: { email: string; id: number; role: string }): string {
  return jwt.sign(
    { email: user.email, id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}