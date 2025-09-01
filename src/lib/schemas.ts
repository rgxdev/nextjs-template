import { z } from "zod";

// Basis-Validierungs-Schemas
export const emailSchema = z
  .string()
  .min(1, "E-Mail-Adresse ist erforderlich")
  .email("Ungültige E-Mail-Adresse");

export const nameSchema = z
  .string()
  .min(2, "Name muss mindestens 2 Zeichen lang sein")
  .max(50, "Name darf maximal 50 Zeichen lang sein")
  .regex(/^[a-zA-ZäöüÄÖÜß\s]+$/, "Name darf nur Buchstaben und Leerzeichen enthalten");

export const passwordSchema = z
  .string()
  .min(8, "Passwort muss mindestens 8 Zeichen lang sein")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
    "Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten");

// User Schema
export const userSchema = z.object({
  id: z.string().min(1, "ID ist erforderlich"),
  name: nameSchema,
  email: emailSchema,
  avatar: z.string().url("Ungültige Avatar-URL").optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createUserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  avatar: z.string().url("Ungültige Avatar-URL").optional(),
});

export const updateUserSchema = createUserSchema.partial();

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Passwort ist erforderlich"),
});

// Contact Form Schema mit detaillierter Validierung
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z
    .string()
    .min(5, "Betreff muss mindestens 5 Zeichen lang sein")
    .max(100, "Betreff darf maximal 100 Zeichen lang sein"),
  message: z
    .string()
    .min(10, "Nachricht muss mindestens 10 Zeichen lang sein")
    .max(1000, "Nachricht darf maximal 1000 Zeichen lang sein"),
  consent: z
    .boolean()
    .refine(val => val === true, {
      message: "Sie müssen den Datenschutzbestimmungen zustimmen",
    }),
  phone: z
    .string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Ungültige Telefonnummer")
    .optional()
    .or(z.literal("")),
});

// Product Schema
export const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Produktname ist erforderlich"),
  description: z.string().min(10, "Beschreibung muss mindestens 10 Zeichen lang sein"),
  price: z.number().positive("Preis muss positiv sein"),
  image: z.string().url("Ungültige Bild-URL"),
  category: z.string().min(1, "Kategorie ist erforderlich"),
  inStock: z.boolean(),
  tags: z.array(z.string()).optional(),
});

// API Response Schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.unknown().optional(),
  error: z.string().optional(),
});

export const paginationSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive().max(100),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

export const userListResponseSchema = z.object({
  data: z.array(userSchema),
  pagination: paginationSchema,
});

// Newsletter Schema
export const newsletterSchema = z.object({
  email: emailSchema,
  categories: z.array(z.enum(["tech", "design", "business", "lifestyle"])).min(1, "Mindestens eine Kategorie auswählen"),
});

// Search Schema
export const searchSchema = z.object({
  query: z.string().min(1, "Suchbegriff ist erforderlich").max(100, "Suchbegriff zu lang"),
  category: z.string().optional(),
  sortBy: z.enum(["name", "date", "price", "popularity"]).default("name"),
  order: z.enum(["asc", "desc"]).default("asc"),
});

// Type Exports
export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;
export type Product = z.infer<typeof productSchema>;
export type ApiResponse = z.infer<typeof apiResponseSchema>;
export type UserListResponse = z.infer<typeof userListResponseSchema>;
export type Newsletter = z.infer<typeof newsletterSchema>;
export type SearchParams = z.infer<typeof searchSchema>;

// Validation Helper Function
export function validateSchema<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues.map((err) => `${err.path.join('.')}: ${err.message}`).join(', ');
      return { success: false, error: errorMessage };
    }
    return { success: false, error: "Unbekannter Validierungsfehler" };
  }
}
