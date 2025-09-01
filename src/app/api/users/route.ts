import { NextRequest, NextResponse } from "next/server";
import { userSchema, createUserSchema } from "@/lib/schemas";
import { z } from "zod";

const mockUsers = [
  {
    id: "1",
    name: "Max Mustermann",
    email: "max@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2", 
    name: "Maria Schmidt",
    email: "maria@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9b0c3b3?w=100&h=100&fit=crop&crop=face",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    name: "Hans Weber", 
    email: "hans@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "10");
    
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "Ungültige Paginierungs-Parameter" },
        { status: 400 }
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = mockUsers.slice(startIndex, endIndex);
    
    const validatedUsers = userSchema.array().parse(paginatedUsers);

    return NextResponse.json({
      data: validatedUsers,
      pagination: {
        page,
        limit,
        total: mockUsers.length,
        totalPages: Math.ceil(mockUsers.length / limit),
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Interner Server-Fehler" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createUserSchema.parse(body);
    
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const validatedUser = userSchema.parse(newUser);
    mockUsers.push(validatedUser);

    return NextResponse.json(validatedUser, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Validation Error",
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Interner Server-Fehler" },
      { status: 500 }
    );
  }
}
