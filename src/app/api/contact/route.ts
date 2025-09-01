import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema, validateSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validiere die eingehenden Daten mit Zod
    const validation = validateSchema(contactFormSchema, body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false,
          error: "Validierungsfehler",
          details: validation.error
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message, phone } = validation.data;

    // Hier würdest du normalerweise:
    // 1. Die Daten in einer Datenbank speichern
    // 2. Eine E-Mail senden
    // 3. Andere Backend-Logik ausführen

    // Simuliere Verarbeitung
    console.log("Kontaktformular eingegangen:", {
      name,
      email,
      subject,
      message,
      phone,
      timestamp: new Date().toISOString(),
    });

    // Simuliere E-Mail-Versand (hier würdest du einen echten Service nutzen)
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: "Nachricht erfolgreich versendet",
      data: {
        id: `msg_${Date.now()}`,
        receivedAt: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error("API Error:", error);
    
    return NextResponse.json(
      { 
        success: false,
        error: "Interner Server-Fehler" 
      },
      { status: 500 }
    );
  }
}

// Für andere HTTP-Methoden
export async function GET() {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    { status: 405 }
  );
}
