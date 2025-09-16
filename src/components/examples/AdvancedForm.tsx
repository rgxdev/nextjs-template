'use client';

import React, { useState, useCallback } from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Upload, X, Check, AlertCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { advancedUserSchema, type AdvancedUser } from '@/lib/schemas';
import type { FormFieldConfig, FormStep } from '@/types/advanced';

interface AdvancedFormProps {
  initialData?: Partial<AdvancedUser>;
  onSubmit: (data: AdvancedUser) => Promise<void>;
  onCancel?: () => void;
  multiStep?: boolean;
  showValidation?: boolean;
}

const formSteps: FormStep[] = [
  {
    id: 'profile',
    title: 'Profil-Information',
    description: 'Grundlegende persönliche Daten',
    fields: [
      { name: 'profile.firstName', type: 'text', label: 'Vorname', required: true },
      { name: 'profile.lastName', type: 'text', label: 'Nachname', required: true },
      { name: 'profile.email', type: 'email', label: 'E-Mail', required: true },
      { name: 'profile.birthDate', type: 'date', label: 'Geburtsdatum', required: true },
      { name: 'profile.bio', type: 'textarea', label: 'Biografie', placeholder: 'Erzählen Sie uns etwas über sich...' },
    ],
  },
  {
    id: 'address',
    title: 'Adresse',
    description: 'Ihre Kontaktadresse',
    fields: [
      { name: 'address.street', type: 'text', label: 'Straße', required: true },
      { name: 'address.houseNumber', type: 'text', label: 'Hausnummer', required: true },
      { name: 'address.zipCode', type: 'text', label: 'PLZ', required: true },
      { name: 'address.city', type: 'text', label: 'Stadt', required: true },
      {
        name: 'address.country',
        type: 'select',
        label: 'Land',
        required: true,
        options: [
          { label: 'Deutschland', value: 'DE' },
          { label: 'Österreich', value: 'AT' },
          { label: 'Schweiz', value: 'CH' },
        ],
      },
    ],
  },
  {
    id: 'contacts',
    title: 'Kontaktdaten',
    description: 'Zusätzliche Kontaktmöglichkeiten',
    fields: [],
  },
  {
    id: 'skills',
    title: 'Fähigkeiten',
    description: 'Ihre beruflichen Kompetenzen',
    fields: [],
  },
  {
    id: 'preferences',
    title: 'Einstellungen',
    description: 'Persönliche Präferenzen',
    fields: [
      {
        name: 'preferences.theme',
        type: 'radio',
        label: 'Theme',
        options: [
          { label: 'Hell', value: 'light' },
          { label: 'Dunkel', value: 'dark' },
          { label: 'System', value: 'system' },
        ],
      },
      {
        name: 'preferences.language',
        type: 'select',
        label: 'Sprache',
        options: [
          { label: 'Deutsch', value: 'de' },
          { label: 'English', value: 'en' },
          { label: 'Français', value: 'fr' },
        ],
      },
    ],
  },
];

export default function AdvancedForm({
  initialData,
  onSubmit,
  onCancel,
  multiStep = true,
  showValidation = true,
}: AdvancedFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const form = useForm({
    defaultValues: {
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        bio: '',
        avatar: '',
        ...initialData?.profile,
      },
      address: {
        street: '',
        houseNumber: '',
        zipCode: '',
        city: '',
        country: 'DE' as const,
        ...initialData?.address,
      },
      contacts: initialData?.contacts || [
        { type: 'email' as const, value: '', isPrimary: true },
      ],
      skills: initialData?.skills || [],
      preferences: {
        theme: 'system' as const,
        language: 'de' as const,
        notifications: {
          email: true,
          push: false,
          sms: false,
        },
        privacy: {
          profileVisible: true,
          emailVisible: false,
          phoneVisible: false,
        },
        ...initialData?.preferences,
      },
      tags: initialData?.tags || [],
      isActive: initialData?.isActive ?? true,
      role: initialData?.role || ('user' as const),
      metadata: initialData?.metadata || {},
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        // Validate with Zod before submitting
        const validated = advancedUserSchema.parse(value);
        await onSubmit(validated);
      } catch (error) {
        console.error('Validation error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const removeUploadedFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addContact = () => {
    form.setFieldValue('contacts', [
      ...form.getFieldValue('contacts'),
      { type: 'email' as const, value: '', isPrimary: false },
    ]);
  };

  const removeContact = (index: number) => {
    const contacts = form.getFieldValue('contacts');
    form.setFieldValue('contacts', contacts.filter((_: any, i: number) => i !== index));
  };

  const addSkill = () => {
    form.setFieldValue('skills', [
      ...form.getFieldValue('skills'),
      { name: '', level: 'beginner' as const, yearsOfExperience: 0 },
    ]);
  };

  const removeSkill = (index: number) => {
    const skills = form.getFieldValue('skills');
    form.setFieldValue('skills', skills.filter((_: any, i: number) => i !== index));
  };

  const addTag = (tag: string) => {
    const tags = form.getFieldValue('tags');
    if (tag && !tags.includes(tag) && tags.length < 10) {
      form.setFieldValue('tags', [...tags, tag]);
    }
  };

  const removeTag = (index: number) => {
    const tags = form.getFieldValue('tags');
    form.setFieldValue('tags', tags.filter((_: any, i: number) => i !== index));
  };

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {formSteps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              index < currentStep
                ? 'bg-green-500 text-white'
                : index === currentStep
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {index < currentStep ? <Check size={16} /> : index + 1}
          </div>
          {index < formSteps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-2 ${
                index < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderProfileStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form.Field name="profile.firstName">
          {field => (
            <div>
              <label className="block text-sm font-medium mb-1">Vorname *</label>
              <Input
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                placeholder="Ihr Vorname"
              />
              {field.state.meta.errors && (
                <p className="text-sm text-red-500 mt-1">{field.state.meta.errors}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="profile.lastName">
          {field => (
            <div>
              <label className="block text-sm font-medium mb-1">Nachname *</label>
              <Input
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                placeholder="Ihr Nachname"
              />
              {field.state.meta.errors && (
                <p className="text-sm text-red-500 mt-1">{field.state.meta.errors}</p>
              )}
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="profile.email">
        {field => (
          <div>
            <label className="block text-sm font-medium mb-1">E-Mail *</label>
            <Input
              type="email"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              placeholder="ihre.email@example.com"
            />
            {field.state.meta.errors && (
              <p className="text-sm text-red-500 mt-1">{field.state.meta.errors}</p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="profile.birthDate">
        {field => (
          <div>
            <label className="block text-sm font-medium mb-1">Geburtsdatum *</label>
            <Input
              type="date"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors && (
              <p className="text-sm text-red-500 mt-1">{field.state.meta.errors}</p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="profile.bio">
        {field => (
          <div>
            <label className="block text-sm font-medium mb-1">Biografie</label>
            <Textarea
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              placeholder="Erzählen Sie uns etwas über sich..."
              rows={4}
            />
            {field.state.meta.errors && (
              <p className="text-sm text-red-500 mt-1">{field.state.meta.errors}</p>
            )}
          </div>
        )}
      </form.Field>

      <div>
        <label className="block text-sm font-medium mb-2">Profilbild</label>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            {isDragActive
              ? 'Lassen Sie das Bild hier fallen...'
              : 'Klicken Sie hier oder ziehen Sie ein Bild hierher'}
          </p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP bis zu 5MB</p>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeUploadedFile(index)}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderAddressStep = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <form.Field name="address.street">
            {field => (
              <div>
                <label className="block text-sm font-medium mb-1">Straße *</label>
                <Input
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="Musterstraße"
                />
                {field.state.meta.errors && (
                  <p className="text-sm text-red-500 mt-1">{field.state.meta.errors}</p>
                )}
              </div>
            )}
          </form.Field>
        </div>

        <form.Field name="address.houseNumber">
          {field => (
            <div>
              <label className="block text-sm font-medium mb-1">Hausnummer *</label>
              <Input
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                placeholder="123"
              />
              {field.state.meta.errors && (
                <p className="text-sm text-red-500 mt-1">{field.state.meta.errors}</p>
              )}
            </div>
          )}
        </form.Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <form.Field name="address.zipCode">
          {field => (
            <div>
              <label className="block text-sm font-medium mb-1">PLZ *</label>
              <Input
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                placeholder="12345"
              />
              {field.state.meta.errors && (
                <p className="text-sm text-red-500 mt-1">{field.state.meta.errors}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="address.city">
          {field => (
            <div>
              <label className="block text-sm font-medium mb-1">Stadt *</label>
              <Input
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                placeholder="Musterstadt"
              />
              {field.state.meta.errors && (
                <p className="text-sm text-red-500 mt-1">{field.state.meta.errors}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="address.country">
          {field => (
            <div>
              <label className="block text-sm font-medium mb-1">Land *</label>
              <select
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="DE">Deutschland</option>
                <option value="AT">Österreich</option>
                <option value="CH">Schweiz</option>
              </select>
              {field.state.meta.errors && (
                <p className="text-sm text-red-500 mt-1">{field.state.meta.errors}</p>
              )}
            </div>
          )}
        </form.Field>
      </div>
    </div>
  );

  const renderContactsStep = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Kontaktdaten</h3>
        <Button type="button" onClick={addContact} variant="outline" size="sm">
          <Plus size={16} className="mr-1" />
          Kontakt hinzufügen
        </Button>
      </div>

      <form.Field name="contacts">
        {field => (
          <div className="space-y-3">
            {field.state.value.map((contact: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium mb-1">Typ</label>
                      <select
                        value={contact.type}
                        onChange={e => {
                          const newContacts = [...field.state.value];
                          newContacts[index] = { ...contact, type: e.target.value };
                          field.handleChange(newContacts);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="phone">Telefon</option>
                        <option value="email">E-Mail</option>
                        <option value="website">Website</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Wert</label>
                      <Input
                        value={contact.value}
                        onChange={e => {
                          const newContacts = [...field.state.value];
                          newContacts[index] = { ...contact, value: e.target.value };
                          field.handleChange(newContacts);
                        }}
                        placeholder={
                          contact.type === 'phone'
                            ? '+49 123 456789'
                            : contact.type === 'email'
                            ? 'email@example.com'
                            : 'https://example.com'
                        }
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`primary-${index}`}
                        checked={contact.isPrimary}
                        onCheckedChange={checked => {
                          const newContacts = [...field.state.value];
                          newContacts[index] = { ...contact, isPrimary: checked };
                          field.handleChange(newContacts);
                        }}
                      />
                      <label htmlFor={`primary-${index}`} className="text-sm">
                        Primär
                      </label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeContact(index)}
                        disabled={field.state.value.length === 1}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </form.Field>
    </div>
  );

  const renderSkillsStep = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Fähigkeiten</h3>
        <Button type="button" onClick={addSkill} variant="outline" size="sm">
          <Plus size={16} className="mr-1" />
          Skill hinzufügen
        </Button>
      </div>

      <form.Field name="skills">
        {field => (
          <div className="space-y-3">
            {field.state.value.map((skill: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Skill</label>
                      <Input
                        value={skill.name}
                        onChange={e => {
                          const newSkills = [...field.state.value];
                          newSkills[index] = { ...skill, name: e.target.value };
                          field.handleChange(newSkills);
                        }}
                        placeholder="JavaScript, Python, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Level</label>
                      <select
                        value={skill.level}
                        onChange={e => {
                          const newSkills = [...field.state.value];
                          newSkills[index] = { ...skill, level: e.target.value };
                          field.handleChange(newSkills);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="beginner">Anfänger</option>
                        <option value="intermediate">Fortgeschritten</option>
                        <option value="advanced">Experte</option>
                        <option value="expert">Meister</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Jahre</label>
                        <Input
                          type="number"
                          min="0"
                          max="50"
                          value={skill.yearsOfExperience}
                          onChange={e => {
                            const newSkills = [...field.state.value];
                            newSkills[index] = {
                              ...skill,
                              yearsOfExperience: parseInt(e.target.value) || 0,
                            };
                            field.handleChange(newSkills);
                          }}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(index)}
                        className="mt-6"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </form.Field>

      <div>
        <label className="block text-sm font-medium mb-2">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          <form.Field name="tags">
            {field => (
              <>
                {field.state.value.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTag(index)}
                      className="p-0 w-4 h-4"
                    >
                      <X size={12} />
                    </Button>
                  </Badge>
                ))}
              </>
            )}
          </form.Field>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Tag hinzufügen..."
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const input = document.querySelector('input[placeholder="Tag hinzufügen..."]') as HTMLInputElement;
              if (input?.value) {
                addTag(input.value);
                input.value = '';
              }
            }}
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPreferencesStep = () => (
    <div className="space-y-6">
      <form.Field name="preferences.theme">
        {field => (
          <div>
            <label className="block text-sm font-medium mb-2">Theme</label>
            <div className="flex gap-4">
              {[
                { value: 'light', label: 'Hell' },
                { value: 'dark', label: 'Dunkel' },
                { value: 'system', label: 'System' },
              ].map(option => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`theme-${option.value}`}
                    name="theme"
                    value={option.value}
                    checked={field.state.value === option.value}
                    onChange={e => field.handleChange(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor={`theme-${option.value}`}>{option.label}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </form.Field>

      <form.Field name="preferences.language">
        {field => (
          <div>
            <label className="block text-sm font-medium mb-1">Sprache</label>
            <select
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
        )}
      </form.Field>

      <div>
        <h4 className="text-sm font-medium mb-3">Benachrichtigungen</h4>
        <div className="space-y-2">
          <form.Field name="preferences.notifications.email">
            {field => (
              <div className="flex items-center">
                <Checkbox
                  id="notifications-email"
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
                <label htmlFor="notifications-email" className="ml-2 text-sm">
                  E-Mail-Benachrichtigungen
                </label>
              </div>
            )}
          </form.Field>

          <form.Field name="preferences.notifications.push">
            {field => (
              <div className="flex items-center">
                <Checkbox
                  id="notifications-push"
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
                <label htmlFor="notifications-push" className="ml-2 text-sm">
                  Push-Benachrichtigungen
                </label>
              </div>
            )}
          </form.Field>

          <form.Field name="preferences.notifications.sms">
            {field => (
              <div className="flex items-center">
                <Checkbox
                  id="notifications-sms"
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
                <label htmlFor="notifications-sms" className="ml-2 text-sm">
                  SMS-Benachrichtigungen
                </label>
              </div>
            )}
          </form.Field>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Privatsphäre</h4>
        <div className="space-y-2">
          <form.Field name="preferences.privacy.profileVisible">
            {field => (
              <div className="flex items-center">
                <Checkbox
                  id="privacy-profile"
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
                <label htmlFor="privacy-profile" className="ml-2 text-sm">
                  Profil öffentlich sichtbar
                </label>
              </div>
            )}
          </form.Field>

          <form.Field name="preferences.privacy.emailVisible">
            {field => (
              <div className="flex items-center">
                <Checkbox
                  id="privacy-email"
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
                <label htmlFor="privacy-email" className="ml-2 text-sm">
                  E-Mail öffentlich sichtbar
                </label>
              </div>
            )}
          </form.Field>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderProfileStep();
      case 1:
        return renderAddressStep();
      case 2:
        return renderContactsStep();
      case 3:
        return renderSkillsStep();
      case 4:
        return renderPreferencesStep();
      default:
        return renderProfileStep();
    }
  };

  const currentStepData = formSteps[currentStep] || formSteps[0];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">
          {multiStep ? `${currentStepData.title}` : 'Benutzer-Formular'}
        </CardTitle>
        {multiStep && <p className="text-gray-600">{currentStepData.description}</p>}
      </CardHeader>

      <CardContent>
        {multiStep && renderStepIndicator()}

        <form
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            if (multiStep && currentStep < formSteps.length - 1) {
              nextStep();
            } else {
              form.handleSubmit();
            }
          }}
        >
          {renderCurrentStep()}

          {showValidation && form.state.errors.length > 0 && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700 mb-2">
                <AlertCircle size={16} />
                <span className="font-medium">Validierungsfehler</span>
              </div>
              <ul className="text-sm text-red-600 space-y-1">
                {form.state.errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <div>
              {multiStep && currentStep > 0 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Zurück
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Abbrechen
                </Button>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-32"
              >
                {isSubmitting
                  ? 'Wird gespeichert...'
                  : multiStep && currentStep < formSteps.length - 1
                  ? 'Weiter'
                  : 'Speichern'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}