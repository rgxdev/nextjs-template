"use client";

import { Button } from "@/components/ui/button";
import { contactFormSchema, type ContactForm, validateSchema } from "@/lib/schemas";
import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
    phone: "",
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const validateField = (fieldName: keyof ContactForm, value: unknown) => {
    try {
      const fieldSchema = contactFormSchema.shape[fieldName];
      fieldSchema.parse(value);
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'issues' in error) {
        const zodError = error as { issues: Array<{ message: string }> };
        setErrors(prev => ({ 
          ...prev, 
          [fieldName]: zodError.issues[0]?.message || "Ungültiger Wert"
        }));
      }
    }
  };

  const handleInputChange = (fieldName: keyof ContactForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    validateField(fieldName, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    // Vollständige Validierung
    const validation = validateSchema(contactFormSchema, formData);
    
    if (!validation.success) {
      setSubmitMessage(`Validierungsfehler: ${validation.error}`);
      setIsSubmitting(false);
      return;
    }

    try {
      // Simuliere API-Call
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
      });

      if (!response.ok) {
        throw new Error("Fehler beim Senden der Nachricht");
      }
      
      setSubmitMessage("Ihre Nachricht wurde erfolgreich gesendet! ✅");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        consent: false,
        phone: "",
      });
      setErrors({});
    } catch (error) {
      setSubmitMessage("Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut. ❌");
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    const validation = validateSchema(contactFormSchema, formData);
    return validation.success && Object.keys(errors).filter(key => errors[key as keyof ContactForm]).length === 0;
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Kontakt</h2>
        <p className="mt-2 text-muted-foreground">
          Haben Sie Fragen? Schreiben Sie uns gerne eine Nachricht.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium leading-none">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Ihr vollständiger Name"
            className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.name ? "border-red-500" : "border-input"
            }`}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none">
            E-Mail <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="ihre.email@example.com"
            className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.email ? "border-red-500" : "border-input"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium leading-none">
            Betreff <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
            placeholder="Worum geht es?"
            className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.subject ? "border-red-500" : "border-input"
            }`}
          />
          {errors.subject && (
            <p className="text-sm text-red-600">{errors.subject}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium leading-none">
            Telefon (optional)
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone || ""}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+49 123 456789"
            className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.phone ? "border-red-500" : "border-input"
            }`}
          />
          {errors.phone && (
            <p className="text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium leading-none">
            Nachricht <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            placeholder="Ihre Nachricht an uns..."
            rows={5}
            className={`flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.message ? "border-red-500" : "border-input"
            }`}
          />
          {errors.message && (
            <p className="text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={(e) => handleInputChange("consent", e.target.checked)}
              className="h-4 w-4 rounded border border-primary text-primary focus:ring-2 focus:ring-primary"
            />
            <label htmlFor="consent" className="text-sm font-normal">
              Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu. <span className="text-red-500">*</span>
            </label>
          </div>
          {errors.consent && (
            <p className="text-sm text-red-600">{errors.consent}</p>
          )}
        </div>

        {submitMessage && (
          <div className={`p-4 rounded-md border ${
            submitMessage.includes("✅") 
              ? "bg-green-50 text-green-700 border-green-200" 
              : "bg-red-50 text-red-700 border-red-200"
          }`}>
            {submitMessage}
          </div>
        )}

        <Button
          type="submit"
          disabled={!isFormValid() || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
        </Button>
      </form>

      <div className="mt-8 p-4 bg-muted rounded-md">
        <h3 className="font-semibold mb-2">Zod Validierung aktiv:</h3>
        <ul className="text-sm space-y-1">
          <li>✓ Name: Mindestens 2 Zeichen, nur Buchstaben</li>
          <li>✓ E-Mail: Gültige E-Mail-Adresse erforderlich</li>
          <li>✓ Betreff: 5-100 Zeichen</li>
          <li>✓ Nachricht: 10-1000 Zeichen</li>
          <li>✓ Telefon: Optionale, gültige Telefonnummer</li>
          <li>✓ Einverständnis: Muss aktiviert sein</li>
        </ul>
      </div>
    </div>
  );
}
