import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
});

const env = envSchema.parse(process.env);

export const constants = {
  name: "Next.js Template",
  description: "Ein modernes Next.js Template mit TanStack-Bibliotheken und Sicherheits-Best-Practices",
  logo: "/logo.svg",
  banner: "/banner.jpg",
  domain: env.NODE_ENV === "development" ? "localhost:3000" : "your-domain.com",
  links: {
    login: env.NEXT_PUBLIC_APP_URL ? `${env.NEXT_PUBLIC_APP_URL}/login` : "https://your-domain.com/login",
    register: env.NEXT_PUBLIC_APP_URL ? `${env.NEXT_PUBLIC_APP_URL}/register` : "https://your-domain.com/register",
    default: env.NEXT_PUBLIC_APP_URL ?? "https://your-domain.com",
    app: env.NEXT_PUBLIC_APP_URL ?? "https://your-domain.com",
  },
  socials: {
    twitter: "https://twitter.com/yourusername",
    instagram: "https://instagram.com/yourusername",
    youtube: "https://youtube.com/@yourusername",
    tiktok: "https://tiktok.com/@yourusername",
    github: "https://github.com/yourusername",
  },
  authors: [{ name: "Your Name", url: "https://your-domain.com" }],
} as const;

export type Constants = typeof constants;