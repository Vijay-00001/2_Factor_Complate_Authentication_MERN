"use server";

import * as z from "zod";

import { RegistrationSchema } from "@/schemas";

export const registration = async (
  values: z.infer<typeof RegistrationSchema>
) => {
  const validatedFields = RegistrationSchema.safeParse(values);

  if (validatedFields.success) {
    return {
      success: "Email Sent!",
    };
  }

  return {
    error: "Invalid Fields!",
  };
};

export default registration;
