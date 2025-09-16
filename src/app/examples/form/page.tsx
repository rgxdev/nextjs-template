'use client';

import React, { useState } from 'react';
import AdvancedForm from '@/components/examples/AdvancedForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, AlertCircle, Clock, Users } from 'lucide-react';
import type { AdvancedUser } from '@/lib/schemas';

// Mock data for demonstration
const mockUser: AdvancedUser = {
  id: 'demo-user-1',
  profile: {
    firstName: 'Max',
    lastName: 'Mustermann',
    email: 'max.mustermann@example.com',
    birthDate: '1990-05-15',
    bio: 'Erfahrener Softwareentwickler mit Leidenschaft für moderne Webtechnologien und Benutzerfreundlichkeit.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=max',
  },
  address: {
    street: 'Musterstraße',
    houseNumber: '123',
    zipCode: '12345',
    city: 'Musterstadt',
    country: 'DE',
  },
  contacts: [
    { type: 'email', value: 'max.mustermann@example.com', isPrimary: true },
    { type: 'phone', value: '+49 123 456789', isPrimary: false },
    { type: 'website', value: 'https://max-mustermann.dev', isPrimary: false },
  ],
  skills: [
    { name: 'JavaScript', level: 'expert', yearsOfExperience: 8 },
    { name: 'TypeScript', level: 'advanced', yearsOfExperience: 5 },
    { name: 'React', level: 'expert', yearsOfExperience: 6 },
    { name: 'Node.js', level: 'advanced', yearsOfExperience: 4 },
  ],
  preferences: {
    theme: 'dark',
    language: 'de',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      profileVisible: true,
      emailVisible: false,
      phoneVisible: false,
    },
  },
  tags: ['Frontend', 'React', 'TypeScript', 'Node.js', 'Full-Stack'],
  isActive: true,
  role: 'admin',
  metadata: {
    lastLogin: '2025-09-16T10:30:00Z',
    registrationDate: '2023-01-15T08:00:00Z',
  },
};

export default function FormPage() {
  const [formData, setFormData] = useState<AdvancedUser | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('create');

  const handleFormSubmit = async (data: AdvancedUser) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Form submitted:', data);
    setFormData(data);
    setShowSuccess(true);
    setIsSubmitting(false);

    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleEditUser = () => {
    setActiveTab('edit');
  };

  const renderFormStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <div className="text-2xl font-bold">5</div>
              <p className="text-sm text-gray-600">Schritte</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-2xl font-bold">3</div>
              <p className="text-sm text-gray-600">Kontaktarten</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            <div>
              <div className="text-2xl font-bold">∞</div>
              <p className="text-sm text-gray-600">Fähigkeiten</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-purple-500" />
            <div>
              <div className="text-2xl font-bold">Zod</div>
              <p className="text-sm text-gray-600">Validierung</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSubmittedData = () => {
    if (!formData) return null;

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Erfolgreich gespeichert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Profil</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {formData.profile.firstName} {formData.profile.lastName}</p>
                <p><strong>E-Mail:</strong> {formData.profile.email}</p>
                <p><strong>Geburtsdatum:</strong> {formData.profile.birthDate}</p>
                {formData.profile.bio && (
                  <p><strong>Bio:</strong> {formData.profile.bio}</p>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Adresse</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Straße:</strong> {formData.address.street} {formData.address.houseNumber}</p>
                <p><strong>PLZ/Stadt:</strong> {formData.address.zipCode} {formData.address.city}</p>
                <p><strong>Land:</strong> {formData.address.country}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Kontakte ({formData.contacts.length})</h4>
              <div className="space-y-2 text-sm">
                {formData.contacts.map((contact: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Badge variant="outline">{contact.type}</Badge>
                    <span>{contact.value}</span>
                    {contact.isPrimary && <Badge variant="default">Primär</Badge>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Fähigkeiten ({formData.skills?.length || 0})</h4>
              <div className="space-y-2 text-sm">
                {formData.skills?.map((skill: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Badge variant="outline">{skill.level}</Badge>
                    <span>{skill.name} ({skill.yearsOfExperience} Jahre)</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {formData.tags?.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Einstellungen</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Theme:</strong> {formData.preferences.theme}</p>
                <p><strong>Sprache:</strong> {formData.preferences.language}</p>
                <p><strong>Rolle:</strong> {formData.role}</p>
                <p><strong>Status:</strong> {formData.isActive ? 'Aktiv' : 'Inaktiv'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Erweiterte Formulare</h1>
        <p className="text-gray-600">
          Vollständige Demonstration der mehrstufigen Formular-Funktionalität mit komplexer Validierung.
        </p>
      </div>

      {renderFormStats()}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Neuer Benutzer</TabsTrigger>
          <TabsTrigger value="edit">Benutzer bearbeiten</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Benutzer erstellen</CardTitle>
              <p className="text-sm text-gray-600">
                Füllen Sie das mehrstufige Formular aus, um einen neuen Benutzer zu erstellen.
              </p>
            </CardHeader>
            <CardContent>
              <AdvancedForm
                onSubmit={handleFormSubmit}
                multiStep={true}
                showValidation={true}
              />
            </CardContent>
          </Card>

          {renderSubmittedData()}
        </TabsContent>

        <TabsContent value="edit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Benutzer bearbeiten</CardTitle>
              <p className="text-sm text-gray-600">
                Bearbeiten Sie die Daten eines bestehenden Benutzers.
              </p>
            </CardHeader>
            <CardContent>
              <AdvancedForm
                initialData={mockUser}
                onSubmit={handleFormSubmit}
                multiStep={true}
                showValidation={true}
              />
            </CardContent>
          </Card>

          {renderSubmittedData()}
        </TabsContent>
      </Tabs>

      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <span>Benutzer erfolgreich gespeichert!</span>
        </div>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Formular-Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">✅ Mehrstufige Navigation</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Schritt-für-Schritt Führung</li>
                <li>• Fortschrittsanzeige</li>
                <li>• Validierung pro Schritt</li>
                <li>• Zwischenspeicherung</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-blue-600">✅ Dynamische Felder</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Array-Felder (Kontakte, Skills)</li>
                <li>• Hinzufügen/Entfernen</li>
                <li>• Verschachtelte Objekte</li>
                <li>• Bedingte Validierung</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-purple-600">✅ Erweiterte Validierung</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Zod-Schema Validierung</li>
                <li>• Echtzeit-Feedback</li>
                <li>• Benutzerfreundliche Meldungen</li>
                <li>• Komplexe Regeln</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-orange-600">✅ Datei-Upload</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Drag & Drop Unterstützung</li>
                <li>• Dateigrößen-Beschränkung</li>
                <li>• Dateityp-Validierung</li>
                <li>• Mehrfach-Upload</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-red-600">✅ UX/UI Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Responsive Design</li>
                <li>• Barrierefreiheit</li>
                <li>• Ladezustände</li>
                <li>• Fehlerbehandlung</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-indigo-600">✅ Technische Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• TypeScript Support</li>
                <li>• TanStack Form</li>
                <li>• React Hook Form</li>
                <li>• Modulare Architektur</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}