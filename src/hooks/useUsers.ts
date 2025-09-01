"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userSchema, type User, type CreateUser } from "@/lib/schemas";

const API_BASE_URL = "/api";

async function fetchUsers(): Promise<readonly User[]> {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error("Fehler beim Laden der Benutzer");
  }
  const data = await response.json();
  return userSchema.array().parse(data);
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error("Benutzer nicht gefunden");
  }
  const data = await response.json();
  return userSchema.parse(data);
}

async function createUser(userData: CreateUser): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error("Fehler beim Erstellen des Benutzers");
  }
  
  const data = await response.json();
  return userSchema.parse(data);
}

async function updateUser(id: string, userData: Partial<CreateUser>): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error("Fehler beim Aktualisieren des Benutzers");
  }
  
  const data = await response.json();
  return userSchema.parse(data);
}

async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    throw new Error("Fehler beim Löschen des Benutzers");
  }
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData<readonly User[]>(["users"], (old) => {
        if (!old) return [newUser];
        return [...old, newUser];
      });
      
      queryClient.setQueryData(["users", newUser.id], newUser);
    },
    onError: (error) => {
      console.error("Fehler beim Erstellen des Benutzers:", error);
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { readonly id: string; readonly data: Partial<CreateUser> }) =>
      updateUser(id, data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<readonly User[]>(["users"], (old) => {
        if (!old) return [updatedUser];
        return old.map((user) => (user.id === updatedUser.id ? updatedUser : user));
      });
      
      queryClient.setQueryData(["users", updatedUser.id], updatedUser);
    },
    onError: (error) => {
      console.error("Fehler beim Aktualisieren des Benutzers:", error);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<readonly User[]>(["users"], (old) => {
        if (!old) return [];
        return old.filter((user) => user.id !== deletedId);
      });
      
      queryClient.removeQueries({ queryKey: ["users", deletedId] });
    },
    onError: (error) => {
      console.error("Fehler beim Löschen des Benutzers:", error);
    },
  });
}
