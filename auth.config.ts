import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          console.log(validateFields.data);
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) throw new Error("Email not found");

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }

        throw new Error("Invalid Credentials!");
      },
    }),
  ],
} satisfies NextAuthConfig;
