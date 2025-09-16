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

// Advanced form schemas
export const advancedUserSchema = z.object({
  id: z.string().optional(),
  profile: z.object({
    firstName: z.string().min(2, "Vorname muss mindestens 2 Zeichen lang sein"),
    lastName: z.string().min(2, "Nachname muss mindestens 2 Zeichen lang sein"),
    email: z.string().email("Ungültige E-Mail-Adresse"),
    avatar: z.string().url().optional(),
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format: YYYY-MM-DD"),
    bio: z.string().max(500, "Bio darf maximal 500 Zeichen lang sein").optional(),
  }),
  address: z.object({
    street: z.string().min(5, "Straße muss mindestens 5 Zeichen lang sein"),
    houseNumber: z.string().min(1, "Hausnummer erforderlich"),
    zipCode: z.string().regex(/^\d{5}$/, "PLZ muss 5 Ziffern enthalten"),
    city: z.string().min(2, "Stadt muss mindestens 2 Zeichen lang sein"),
    country: z.enum(["DE", "AT", "CH"]).refine((val) => ["DE", "AT", "CH"].includes(val), {
      message: "Wählen Sie ein Land aus"
    }),
  }),
  contacts: z.array(z.object({
    type: z.enum(["phone", "email", "website"]),
    value: z.string().min(1, "Wert erforderlich"),
    isPrimary: z.boolean().default(false),
  })).min(1, "Mindestens eine Kontaktmöglichkeit erforderlich"),
  skills: z.array(z.object({
    name: z.string().min(1, "Skill-Name erforderlich"),
    level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
    yearsOfExperience: z.number().min(0).max(50),
  })).optional(),
  preferences: z.object({
    theme: z.enum(["light", "dark", "system"]).default("system"),
    language: z.enum(["de", "en", "fr"]).default("de"),
    notifications: z.object({
      email: z.boolean().default(true),
      push: z.boolean().default(false),
      sms: z.boolean().default(false),
    }),
    privacy: z.object({
      profileVisible: z.boolean().default(true),
      emailVisible: z.boolean().default(false),
      phoneVisible: z.boolean().default(false),
    }),
  }),
  tags: z.array(z.string()).max(10, "Maximal 10 Tags erlaubt").optional(),
  isActive: z.boolean().default(true),
  role: z.enum(["user", "admin", "moderator"]).default("user"),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const fileUploadSchema = z.object({
  file: z.instanceof(File, { message: "Datei erforderlich" })
    .refine((file) => file.size <= 5 * 1024 * 1024, "Datei darf maximal 5MB groß sein")
    .refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), 
      "Nur JPEG, PNG und WebP Dateien erlaubt"),
  title: z.string().min(1, "Titel erforderlich").max(100, "Titel zu lang"),
  description: z.string().max(500, "Beschreibung zu lang").optional(),
  tags: z.array(z.string()).max(5, "Maximal 5 Tags").optional(),
  isPublic: z.boolean().default(false),
});

export const dynamicFormSchema = z.object({
  formTitle: z.string().min(1, "Formular-Titel erforderlich"),
  fields: z.array(z.object({
    id: z.string(),
    type: z.enum(["text", "email", "number", "select", "multiselect", "textarea", "checkbox", "radio", "date"]),
    label: z.string().min(1, "Label erforderlich"),
    placeholder: z.string().optional(),
    required: z.boolean().default(false),
    options: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
    validation: z.object({
      min: z.number().optional(),
      max: z.number().optional(),
      pattern: z.string().optional(),
    }).optional(),
  })).min(1, "Mindestens ein Feld erforderlich"),
  responses: z.record(z.string(), z.any()).optional(),
});

export const tableFilterSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["all", "active", "inactive", "pending"]).default("all"),
  role: z.enum(["all", "user", "admin", "moderator"]).default("all"),
  dateRange: z.object({
    from: z.string().optional(),
    to: z.string().optional(),
  }).optional(),
  sortBy: z.string().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  page: z.number().min(1).default(1),
  pageSize: z.number().refine((val) => [10, 25, 50, 100].includes(val), {
    message: "Seitengröße muss 10, 25, 50 oder 100 sein"
  }).default(25),
});

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;
export type UserPreferences = z.infer<typeof userPreferencesSchema>;
export type MultiStepForm = z.infer<typeof multiStepFormSchema>;
export type Product = z.infer<typeof productSchema>;
export type AdvancedUser = z.infer<typeof advancedUserSchema>;
export type FileUpload = z.infer<typeof fileUploadSchema>;
export type DynamicForm = z.infer<typeof dynamicFormSchema>;
export type TableFilter = z.infer<typeof tableFilterSchema>;

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
