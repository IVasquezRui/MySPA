import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Strict Stateless Validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Correo electrónico inválido o no proporcionado." },
        { status: 400 }
      );
    }

    if (!message || message.trim().length < 5) {
      return NextResponse.json(
        { error: "El mensaje debe contener al menos 5 caracteres." },
        { status: 400 }
      );
    }

    // In a production serverless environment on Netlify,
    // this can integrate with Resend, SendGrid, or Netlify Forms
    console.log(`[Contact Form Submission] From: ${name || "Anónimo"} <${email}>: ${message.slice(0, 50)}...`);

    return NextResponse.json(
      {
        success: true,
        message: "Mensaje procesado con éxito. Me pondré en contacto contigo pronto.",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en endpoint de contacto:", error);
    return NextResponse.json(
      { error: "Error interno al procesar la solicitud." },
      { status: 500 }
    );
  }
}
