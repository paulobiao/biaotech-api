import bcrypt from "bcryptjs";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

import * as authRepository from "../repositories/authRepository";

interface LoginParams {
  email: string;
  password: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface TokenPayload {
  id: number;
  email: string;
  role: string;
}

const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  } as SignOptions);
};

const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as Secret, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  } as SignOptions);
};

export const login = async ({
  email,
  password,
}: LoginParams): Promise<AuthTokens | null> => {
  const user = await authRepository.findAuthUserByEmail(email);

  if (!user) {
    return null;
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch) {
    return null;
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

export const refreshAccessToken = (refreshToken: string): string | null => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as Secret
    ) as TokenPayload;

    return generateAccessToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });
  } catch {
    return null;
  }
};