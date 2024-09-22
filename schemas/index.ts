import * as z from "zod";

// Function to validate name
const nameValidation = z.string().min(1).trim().nullable();

// Function to check if email is from popular or government/educational providers
const popularEmailProviders = [
  "gmail.com",
  "apple.com",
  "yahoo.com",
  "outlook.com",
];
const allowedDomains = ["gov", "edu", "ac.in"]; // Government or educational domains

const emailValidation = z
  .string()
  .email({ message: "Please enter a valid email address" }) // Use built-in email validation first
  .refine(
    (email) => {
      // Check if email contains '@' before attempting to split
      const parts = email.split("@");
      if (parts.length < 2) return false; // Invalid if no '@' symbol or missing domain

      const domain = parts[1]; // Get the domain part of the email
      const topLevelDomain = domain.split(".").slice(-1)[0]; // Get the last part of the domain (e.g., .gov, .com)
      const secondLevelDomain = domain.split(".").slice(-2).join("."); // For domains like ac.in

      // Allow if it's from a popular provider or has a valid government/education domain
      return (
        popularEmailProviders.includes(domain) ||
        allowedDomains.includes(topLevelDomain) ||
        allowedDomains.includes(secondLevelDomain)
      );
    },
    {
      message: "Please enter a valid email address.",
    }
  );

// Function to validate password strength
const passwordValidation = z
  .string()
  .min(1)
  .refine(
    (password) => {
      let strength = 0;

      if (password.length >= 8) strength++; // length >= 8
      if (/[a-z]/.test(password)) strength++; // contains lowercase letter
      if (/[A-Z]/.test(password)) strength++; // contains uppercase letter
      if (/\d/.test(password)) strength++; // contains number
      if (/[^a-zA-Z0-9]/.test(password)) strength++; // contains special character

      return strength >= 2; // Minimum criteria
    },
    {
      message:
        "Password must have at least 8 characters and include both letters and numbers",
    }
  );

// Create a Zod schema for registration validation
export const RegistrationSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});

// Create a Zod schema for login validation
export const LoginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});
