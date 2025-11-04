import bcrypt from 'bcrypt';
import prisma from '../config/database';
import { ApiError } from '../utils/apiError';
import { generateToken } from '../utils/jwt';

export async function register(email: string, password: string, name: string) {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new ApiError(400, 'Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  const token = generateToken({ id: user.id, email: user.email });

  return { user, token };
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = generateToken({ id: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  };
}
