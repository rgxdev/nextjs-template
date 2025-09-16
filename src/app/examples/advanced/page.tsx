'use client';

import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import AdvancedForm from '@/components/examples/AdvancedForm';
import AdvancedTable from '@/components/examples/AdvancedTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { AdvancedUser, AdvancedTableConfig } from '@/types/advanced';

// Mock data for demonstration
const mockUsers: AdvancedUser[] = [
  {
    id: '1',
    profile: {
      firstName: 'Max',
      lastName: 'Mustermann',
      email: 'max.mustermann@example.com',
      birthDate: '1990-05-15',
      bio: 'Softwareentwickler mit Leidenschaft für moderne Technologien.',
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
    ],
    skills: [
      { name: 'JavaScript', level: 'expert', yearsOfExperience: 8 },
      { name: 'TypeScript', level: 'advanced', yearsOfExperience: 5 },
      { name: 'React', level: 'expert', yearsOfExperience: 6 },
    ],
    preferences: {
      theme: 'dark',
      language: 'de',
      notifications: { email: true, push: true, sms: false },
      privacy: { profileVisible: true, emailVisible: false, phoneVisible: false },
    },
    tags: ['Frontend', 'React', 'TypeScript'],
    isActive: true,
    role: 'admin',
  },
  {
    id: '2',
    profile: {
      firstName: 'Anna',
      lastName: 'Schmidt',
      email: 'anna.schmidt@example.com',
      birthDate: '1988-12-03',
      bio: 'UX/UI Designerin mit Fokus auf Benutzerfreundlichkeit.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anna',
    },
    address: {
      street: 'Designweg',
      houseNumber: '45',
      zipCode: '54321',
      city: 'Designstadt',
      country: 'DE',
    },
    contacts: [
      { type: 'email', value: 'anna.schmidt@example.com', isPrimary: true },
      { type: 'website', value: 'https://anna-design.de', isPrimary: false },
    ],
    skills: [
      { name: 'Figma', level: 'expert', yearsOfExperience: 7 },
      { name: 'Adobe XD', level: 'advanced', yearsOfExperience: 4 },
      { name: 'Sketch', level: 'intermediate', yearsOfExperience: 3 },
    ],
    preferences: {
      theme: 'light',
      language: 'de',
      notifications: { email: true, push: false, sms: false },
      privacy: { profileVisible: true, emailVisible: true, phoneVisible: false },
    },
    tags: ['UX', 'UI', 'Design'],
    isActive: true,
    role: 'user',
  },
  {
    id: '3',
    profile: {
      firstName: 'Tom',
      lastName: 'Wagner',
      email: 'tom.wagner@example.com',
      birthDate: '1995-08-22',
      bio: 'Backend-Entwickler spezialisiert auf skalierbare Systeme.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tom',
    },
    address: {
      street: 'Serverstraße',
      houseNumber: '67',
      zipCode: '98765',
      city: 'Serverstadt',
      country: 'DE',
    },
    contacts: [
      { type: 'email', value: 'tom.wagner@example.com', isPrimary: true },
      { type: 'phone', value: '+49 987 654321', isPrimary: false },
    ],
    skills: [
      { name: 'Node.js', level: 'expert', yearsOfExperience: 6 },
      { name: 'Python', level: 'advanced', yearsOfExperience: 4 },
      { name: 'PostgreSQL', level: 'expert', yearsOfExperience: 5 },
    ],
    preferences: {
      theme: 'system',
      language: 'en',
      notifications: { email: true, push: true, sms: true },
      privacy: { profileVisible: false, emailVisible: false, phoneVisible: false },
    },
    tags: ['Backend', 'Node.js', 'Database'],
    isActive: false,
    role: 'user',
  },
];

export default function AdvancedFormsAndTablesPage() {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<AdvancedUser | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormSubmit = async (data: AdvancedUser) => {
    console.log('Form submitted:', data);

    if (data.id) {
      // Update existing user
      setUsers(prev => prev.map(user => user.id === data.id ? data : user));
    } else {
      // Create new user
      const newUser = { ...data, id: Date.now().toString() };
      setUsers(prev => [...prev, newUser]);
    }

    setIsFormOpen(false);
    setSelectedUser(null);
  };

  const handleEditUser = (user: AdvancedUser) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie diesen Benutzer löschen möchten?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const tableConfig: AdvancedTableConfig<AdvancedUser> = useMemo(() => ({
    columns: [
      {
        id: 'profile',
        header: 'Profil',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={row.original.profile.avatar} />
              <AvatarFallback>
                {row.original.profile.firstName[0]}{row.original.profile.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">
                {row.original.profile.firstName} {row.original.profile.lastName}
              </div>
              <div className="text-sm text-gray-500">{row.original.profile.email}</div>
            </div>
          </div>
        ),
        sortable: false,
      },
      {
        id: 'role',
        header: 'Rolle',
        accessorKey: 'role',
        cell: ({ getValue }) => (
          <Badge variant={getValue() === 'admin' ? 'default' : 'secondary'}>
            {getValue() === 'admin' ? 'Administrator' : 'Benutzer'}
          </Badge>
        ),
      },
      {
        id: 'status',
        header: 'Status',
        accessorKey: 'isActive',
        cell: ({ getValue }) => (
          <Badge variant={getValue() ? 'default' : 'secondary'}>
            {getValue() ? 'Aktiv' : 'Inaktiv'}
          </Badge>
        ),
      },
      {
        id: 'skills',
        header: 'Fähigkeiten',
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill.name}
              </Badge>
            ))}
            {row.original.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{row.original.skills.length - 3}
              </Badge>
            )}
          </div>
        ),
        sortable: false,
      },
      {
        id: 'location',
        header: 'Ort',
        cell: ({ row }) => (
          <div className="text-sm">
            {row.original.address.city}, {row.original.address.country}
          </div>
        ),
        sortable: false,
      },
      {
        id: 'createdAt',
        header: 'Erstellt',
        cell: () => (
          <div className="text-sm text-gray-500">
            {format(new Date(), 'dd.MM.yyyy', { locale: de })}
          </div>
        ),
      },
      {
        id: 'actions',
        header: 'Aktionen',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditUser(row.original)}
            >
              Bearbeiten
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteUser(row.original.id!)}
              className="text-red-600 hover:text-red-700"
            >
              Löschen
            </Button>
          </div>
        ),
        sortable: false,
      },
    ],
    data: users,
    enableSorting: true,
    enableFiltering: true,
    enableGlobalFilter: true,
    enableRowSelection: true,
    rowActions: [
      {
        label: 'Bearbeiten',
        onClick: handleEditUser,
        icon: () => <span>✏️</span>,
      },
      {
        label: 'Löschen',
        onClick: (user) => handleDeleteUser(user.id!),
        icon: () => <span>🗑️</span>,
        confirmText: 'Sind Sie sicher, dass Sie diesen Benutzer löschen möchten?',
      },
    ],
    bulkActions: [
      {
        label: 'Löschen',
        onClick: (selectedUsers) => {
          const ids = selectedUsers.map(user => user.id!);
          setUsers(prev => prev.filter(user => !ids.includes(user.id!)));
        },
        variant: 'destructive',
        confirmText: 'Sind Sie sicher, dass Sie die ausgewählten Benutzer löschen möchten?',
      },
    ],
    onRowClick: handleEditUser,
    emptyMessage: 'Keine Benutzer gefunden',
    searchPlaceholder: 'Nach Name, E-Mail oder Fähigkeiten suchen...',
  }), [users]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Erweiterte Formulare & Tabellen</h1>
        <p className="text-gray-600">
          Demonstration der erweiterten Formular- und Tabellen-Komponenten mit TanStack Form und TanStack Table.
        </p>
      </div>

      <Tabs defaultValue="table" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="table">Erweiterte Tabelle</TabsTrigger>
          <TabsTrigger value="form">Erweitertes Formular</TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Benutzer-Verwaltung</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Verwaltung von Benutzerprofilen mit erweiterten Funktionen
                </p>
              </div>
              <Button onClick={() => setIsFormOpen(true)}>
                Neuer Benutzer
              </Button>
            </CardHeader>
            <CardContent>
              <AdvancedTable config={tableConfig} height={600} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features der erweiterten Tabelle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Sortierung & Filterung</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Mehrstufige Sortierung</li>
                    <li>• Globale Suche</li>
                    <li>• Spalten-spezifische Filter</li>
                    <li>• Erweiterte Filteroptionen</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Auswahl & Aktionen</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Einzel- und Mehrfachauswahl</li>
                    <li>• Zeilen-Aktionen</li>
                    <li>• Massenaktionen</li>
                    <li>• Kontextmenüs</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Darstellung & Export</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Spalten-Anpassung</li>
                    <li>• CSV-Export</li>
                    <li>• Virtualisierung für große Datenmengen</li>
                    <li>• Responsive Design</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form" className="space-y-6">
          {isFormOpen ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>
                    {selectedUser ? 'Benutzer bearbeiten' : 'Neuer Benutzer'}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedUser
                      ? 'Bearbeiten Sie die Benutzerdaten'
                      : 'Erstellen Sie ein neues Benutzerprofil'
                    }
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsFormOpen(false);
                    setSelectedUser(null);
                  }}
                >
                  Schließen
                </Button>
              </CardHeader>
              <CardContent>
                <AdvancedForm
                  initialData={selectedUser || undefined}
                  onSubmit={handleFormSubmit}
                  onCancel={() => {
                    setIsFormOpen(false);
                    setSelectedUser(null);
                  }}
                  multiStep={true}
                  showValidation={true}
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Erweitertes Formular</CardTitle>
                <p className="text-gray-600 mt-2">
                  Klicken Sie auf "Neuer Benutzer" um das mehrstufige Formular zu öffnen
                </p>
                <Button
                  onClick={() => setIsFormOpen(true)}
                  className="mt-4"
                  size="lg"
                >
                  Neuer Benutzer erstellen
                </Button>
              </CardHeader>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Features des erweiterten Formulars</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Mehrstufige Formulare</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Schritt-für-Schritt Navigation</li>
                    <li>• Fortschrittsanzeige</li>
                    <li>• Validierung pro Schritt</li>
                    <li>• Zwischenspeicherung</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Dynamische Felder</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Array-Felder (Kontakte, Fähigkeiten)</li>
                    <li>• Bedingte Felder</li>
                    <li>• Datei-Uploads</li>
                    <li>• Verschachtelte Objekte</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Validierung & UX</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Echtzeit-Validierung</li>
                    <li>• Benutzerfreundliche Fehlermeldungen</li>
                    <li>• Drag & Drop Datei-Upload</li>
                    <li>• Responsive Design</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}