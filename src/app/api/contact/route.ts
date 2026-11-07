import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      tel,
      country,
      enquiryType,
      message,
      quiz,
      quizExpected,
    } = body ?? {};

    // Validation
    if (!firstName || !lastName || !email || !country || !enquiryType || !message) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être renseignés." },
        { status: 400 }
      );
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRe.test(String(email))) {
      return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
    }
    if (Number(quiz) !== Number(quizExpected)) {
      return NextResponse.json(
        { error: "La vérification anti-spam est incorrecte." },
        { status: 400 }
      );
    }
    if (String(message).length > 5000) {
      return NextResponse.json({ error: "Message trop long." }, { status: 400 });
    }

    const saved = await db.contactMessage.create({
      data: {
        firstName: String(firstName).slice(0, 100),
        lastName: String(lastName).slice(0, 100),
        email: String(email).slice(0, 200),
        tel: tel ? String(tel).slice(0, 40) : null,
        country: String(country).slice(0, 100),
        enquiryType: String(enquiryType).slice(0, 100),
        message: String(message).slice(0, 5000),
      },
    });

    return NextResponse.json({ ok: true, id: saved.id });
  } catch (e) {
    console.error("contact API error:", e);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l’envoi du message." },
      { status: 500 }
    );
  }
}
