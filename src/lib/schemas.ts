import { z } from "zod";

export const userSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  avatar: z.string().url().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateUserSchema = createUserSchema.partial();

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Name muss mindestens 2 Zeichen lang sein")
    .max(50, "Name darf maximal 50 Zeichen lang sein")
    .regex(/^[a-zA-ZäöüÄÖÜß\s]+$/, "Name darf nur Buchstaben enthalten"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  subject: z.string()
    .min(5, "Betreff muss mindestens 5 Zeichen lang sein")
    .max(100, "Betreff darf maximal 100 Zeichen lang sein"),
  message: z.string()
    .min(10, "Nachricht muss mindestens 10 Zeichen lang sein")
    .max(1000, "Nachricht darf maximal 1000 Zeichen lang sein"),
  phone: z.string()
    .regex(/^(\+?[\d\s\-\(\)]+)?$/, "Ungültige Telefonnummer")
    .optional()
    .or(z.literal("")),
  consent: z.boolean().refine((val) => val === true, {
    message: "Sie müssen den Datenschutzbestimmungen zustimmen",
  }),
});

export const userPreferencesSchema = z.object({
  company: z.string().max(100, "Firmenname darf maximal 100 Zeichen lang sein").optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  newsletter: z.boolean().default(false),
  notifications: z.boolean().default(true),
  theme: z.enum(["light", "dark", "system"]).default("system"),
});

export const multiStepFormSchema = z.object({
  // Step 1: Basic Info
  firstName: z.string().min(2, "Vorname muss mindestens 2 Zeichen lang sein"),
  lastName: z.string().min(2, "Nachname muss mindestens 2 Zeichen lang sein"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, "Ungültige Telefonnummer"),
  
  // Step 2: Address
  street: z.string().min(5, "Straße muss mindestens 5 Zeichen lang sein"),
  city: z.string().min(2, "Stadt muss mindestens 2 Zeichen lang sein"),
  zipCode: z.string().regex(/^\d{5}$/, "PLZ muss 5 Ziffern enthalten"),
  country: z.string().min(2, "Land auswählen"),
  
  // Step 3: Preferences
  interests: z.array(z.string()).min(1, "Mindestens ein Interesse auswählen"),
  communicationMethod: z.enum(["email", "phone", "both"]),
  newsletter: z.boolean(),
  
  // Step 4: Terms
  terms: z.boolean().refine((val) => val === true, "AGBs müssen akzeptiert werden"),
  privacy: z.boolean().refine((val) => val === true, "Datenschutz muss akzeptiert werden"),
});

export const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  price: z.number().positive(),
  image: z.string().url(),
  category: z.string(),
  inStock: z.boolean(),
});

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;
export type UserPreferences = z.infer<typeof userPreferencesSchema>;
export type MultiStepForm = z.infer<typeof multiStepFormSchema>;
export type Product = z.infer<typeof productSchema>;

// Utility function for schema validation
export function validateSchema<T>(schema: z.ZodSchema<T>, data: unknown): 
  { success: true; data: T } | { success: false; error: string } {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join(', ');
      return { success: false, error: errorMessage };
    }
    return { success: false, error: "Unbekannter Validierungsfehler" };
  }
}
