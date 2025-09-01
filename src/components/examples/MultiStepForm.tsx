"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { multiStepFormSchema, validateSchema, type MultiStepForm } from "@/lib/schemas";
import { ChevronLeft, ChevronRight, Check, User, MapPin, Heart, FileText } from "lucide-react";

const STEPS = [
  { id: 1, title: "Persönliche Daten", icon: User },
  { id: 2, title: "Adresse", icon: MapPin },
  { id: 3, title: "Präferenzen", icon: Heart },
  { id: 4, title: "Bestätigung", icon: FileText },
];

const INTERESTS = [
  "Technologie",
  "Sport",
  "Musik",
  "Reisen",
  "Kochen",
  "Lesen",
  "Gaming",
  "Kunst",
];

const COUNTRIES = [
  "Deutschland",
  "Österreich",
  "Schweiz",
  "Niederlande",
  "Belgien",
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<MultiStepForm>>({
    interests: [],
    newsletter: false,
    communicationMethod: "email",
    terms: false,
    privacy: false,
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof MultiStepForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateCurrentStep = () => {
    const stepErrors: Partial<Record<keyof MultiStepForm, string>> = {};
    
    switch (currentStep) {
      case 1:
        if (!formData.firstName || formData.firstName.length < 2) {
          stepErrors.firstName = "Vorname muss mindestens 2 Zeichen lang sein";
        }
        if (!formData.lastName || formData.lastName.length < 2) {
          stepErrors.lastName = "Nachname muss mindestens 2 Zeichen lang sein";
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
          stepErrors.email = "Ungültige E-Mail-Adresse";
        }
        if (!formData.phone || !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
          stepErrors.phone = "Ungültige Telefonnummer";
        }
        break;
      
      case 2:
        if (!formData.street || formData.street.length < 5) {
          stepErrors.street = "Straße muss mindestens 5 Zeichen lang sein";
        }
        if (!formData.city || formData.city.length < 2) {
          stepErrors.city = "Stadt muss mindestens 2 Zeichen lang sein";
        }
        if (!formData.zipCode || !/^\d{5}$/.test(formData.zipCode)) {
          stepErrors.zipCode = "PLZ muss 5 Ziffern enthalten";
        }
        if (!formData.country) {
          stepErrors.country = "Land auswählen";
        }
        break;
      
      case 3:
        if (!formData.interests || formData.interests.length === 0) {
          stepErrors.interests = "Mindestens ein Interesse auswählen";
        }
        break;
      
      case 4:
        if (!formData.terms) {
          stepErrors.terms = "AGBs müssen akzeptiert werden";
        }
        if (!formData.privacy) {
          stepErrors.privacy = "Datenschutz muss akzeptiert werden";
        }
        break;
    }
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (field: keyof MultiStepForm, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    
    const validation = validateSchema(multiStepFormSchema, formData);
    if (!validation.success) {
      console.error("Validation failed:", validation.error);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simuliere API Call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Formular erfolgreich gesendet! ✅");
      
      // Reset form
      setFormData({
        interests: [],
        newsletter: false,
        communicationMethod: "email",
        terms: false,
        privacy: false,
      });
      setCurrentStep(1);
    } catch (error) {
      alert("Fehler beim Senden ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Persönliche Informationen</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                  Vorname *
                </label>
                <Input
                  id="firstName"
                  value={formData.firstName || ""}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Max"
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                  Nachname *
                </label>
                <Input
                  id="lastName"
                  value={formData.lastName || ""}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Mustermann"
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                E-Mail-Adresse *
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="max@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Telefonnummer *
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+49 123 456789"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Adressinformationen</h3>
            
            <div>
              <label htmlFor="street" className="block text-sm font-medium mb-2">
                Straße und Hausnummer *
              </label>
              <Input
                id="street"
                value={formData.street || ""}
                onChange={(e) => handleInputChange("street", e.target.value)}
                placeholder="Musterstraße 123"
                className={errors.street ? "border-red-500" : ""}
              />
              {errors.street && (
                <p className="text-red-600 text-sm mt-1">{errors.street}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
                  PLZ *
                </label>
                <Input
                  id="zipCode"
                  value={formData.zipCode || ""}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  placeholder="12345"
                  className={errors.zipCode ? "border-red-500" : ""}
                />
                {errors.zipCode && (
                  <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>
                )}
              </div>
              
              <div className="col-span-2">
                <label htmlFor="city" className="block text-sm font-medium mb-2">
                  Stadt *
                </label>
                <Input
                  id="city"
                  value={formData.city || ""}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Berlin"
                  className={errors.city ? "border-red-500" : ""}
                />
                {errors.city && (
                  <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium mb-2">
                Land *
              </label>
              <select
                id="country"
                value={formData.country || ""}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  errors.country ? "border-red-500" : "border-input"
                }`}
              >
                <option value="">Land auswählen</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-600 text-sm mt-1">{errors.country}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Präferenzen</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Interessen (mindestens 1 auswählen) *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {INTERESTS.map(interest => (
                  <label key={interest} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.interests?.includes(interest) || false}
                      onChange={(e) => {
                        const currentInterests = formData.interests || [];
                        if (e.target.checked) {
                          handleInputChange("interests", [...currentInterests, interest]);
                        } else {
                          handleInputChange("interests", currentInterests.filter(i => i !== interest));
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span className="text-sm">{interest}</span>
                  </label>
                ))}
              </div>
              {errors.interests && (
                <p className="text-red-600 text-sm mt-1">{errors.interests}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Bevorzugte Kontaktmethode
              </label>
              <div className="space-y-2">
                {[
                  { value: "email", label: "E-Mail" },
                  { value: "phone", label: "Telefon" },
                  { value: "both", label: "Beides" },
                ].map(option => (
                  <label key={option.value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="communicationMethod"
                      value={option.value}
                      checked={formData.communicationMethod === option.value}
                      onChange={(e) => handleInputChange("communicationMethod", e.target.value as "email" | "phone" | "both")}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.newsletter || false}
                  onChange={(e) => handleInputChange("newsletter", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm">Newsletter abonnieren</span>
              </label>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Bestätigung</h3>
            
            <div className="bg-muted p-4 rounded-md space-y-2">
              <h4 className="font-medium">Zusammenfassung Ihrer Daten:</h4>
              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>E-Mail:</strong> {formData.email}</p>
              <p><strong>Telefon:</strong> {formData.phone}</p>
              <p><strong>Adresse:</strong> {formData.street}, {formData.zipCode} {formData.city}, {formData.country}</p>
              <p><strong>Interessen:</strong> {formData.interests?.join(", ")}</p>
              <p><strong>Kontakt:</strong> {formData.communicationMethod}</p>
              <p><strong>Newsletter:</strong> {formData.newsletter ? "Ja" : "Nein"}</p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.terms || false}
                  onChange={(e) => handleInputChange("terms", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm">Ich akzeptiere die AGBs *</span>
              </label>
              {errors.terms && (
                <p className="text-red-600 text-sm">{errors.terms}</p>
              )}

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.privacy || false}
                  onChange={(e) => handleInputChange("privacy", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm">Ich akzeptiere die Datenschutzerklärung *</span>
              </label>
              {errors.privacy && (
                <p className="text-red-600 text-sm">{errors.privacy}</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Multi-Step Formular</h2>
        <p className="text-muted-foreground">
          Demonstriert komplexe Formular-Validierung mit mehreren Schritten
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isCompleted 
                    ? "bg-green-500 border-green-500 text-white" 
                    : isActive 
                      ? "border-blue-500 text-blue-500" 
                      : "border-gray-300 text-gray-400"
                }`}>
                  {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                </div>
                <span className={`ml-2 text-sm ${
                  isActive ? "text-blue-500 font-medium" : "text-gray-500"
                }`}>
                  {step.title}
                </span>
                
                {index < STEPS.length - 1 && (
                  <div className={`flex-1 h-px mx-4 ${
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          {renderStepContent()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Zurück
            </Button>
            
            {currentStep === 4 ? (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Wird gesendet..." : "Absenden"}
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Weiter
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
