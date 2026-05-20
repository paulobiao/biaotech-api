import type { UserRole } from "./roles";

export interface User {
  id: number;
  name: string;
}

export interface AuthUser {
  id: number;
  email: string;
  password: string;
  role: UserRole;
}

export interface PublicAuthUser {
  id: number;
  email: string;
  role: UserRole;
}