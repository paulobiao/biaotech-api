import type { UserRole } from "./roles";

export interface JwtPayload {
  id: number;
  email: string;
  role: UserRole;
}