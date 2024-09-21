/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import * as z from "zod";

import { LoginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (validatedFields.success) {
    return {
      success: "Email Sent!",
    };
  }

  return {
    error: "Invalid Fields!",
  };
};
