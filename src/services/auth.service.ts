import { PrismaClient, User } from "@prisma/client";
import * as argon from "argon2";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config/config";

export class AuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async registerForUser(
    email: string,
    password: string
  ): Promise<{ status: boolean; message: string }> {
    
    try {
      const existUser = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existUser) {
        return{status:false,message:"User already registered"};
      }
      const hashedPassword = await argon.hash(password);

      await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: "USER",
        },
      });

      return { status: true, message: "Signup successfull" };
    } catch (err: any) {
      return { status: false, message: err.message };
    }
  }

  async registerForAdmin(
    email: string,
    password: string
  ): Promise<{ status: boolean; message: string }> {
    
    try {
      const existUser = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existUser) {
        return{status:false,message:"User already registered"};
      }
      const hashedPassword = await argon.hash(password);

      await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: "ADMIN",
        },
      });

      return { status: true, message: "Signup successfull" };
    } catch (err: any) {
      return { status: false, message: err.message };
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<
    { status: boolean; token: string } | { status: boolean; message: string }
  > {
    if (!email || !password) {
      return {
        status: false,
        message: "Email & Passwords are necessary for signup",
      };
    }
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error("User not found, Please register first");
      }
      const isValid = await argon.verify(user.password, password);
      if (!isValid) {
        throw new Error("Invalid Password");
      }
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        config.jwtSecret as jwt.Secret,
        { expiresIn: config.tokenExpiry } as SignOptions
      );

      return { status: true, token };
    } catch (err: any) {
      return { status: false, message: err.message };
    }
  }
}
