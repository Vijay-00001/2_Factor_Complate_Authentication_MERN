"use server";

import * as z from "zod";

import { RegistrationSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const registration = async (
  values: z.infer<typeof RegistrationSchema>
) => {
  const validatedFields = RegistrationSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid Fields!",
    };
  }

  const { name, email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "Email Already Exists!",
    };
  }

  const hashPassword = await bcrypt.hash(password, 11);

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  if (user) {
    return {
      success: "Email Sent!",
    };
  }
  return {
    error: "Something went wrong!",
  };
};

export default registration;
