export interface User {
  id: number;
  name: string;
}

export interface AuthUser {
  id: number;
  email: string;
  password: string;
}

export interface PublicAuthUser {
  id: number;
  email: string;
}