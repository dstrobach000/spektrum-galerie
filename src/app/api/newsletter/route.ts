import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const parsed: unknown = await req.json().catch(() => null);
    const email =
      parsed &&
      typeof parsed === "object" &&
      "email" in (parsed as Record<string, unknown>) &&
      typeof (parsed as Record<string, unknown>).email === "string"
        ? ((parsed as { email: string }).email || "").trim()
        : "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Prosím, zadejte platný e-mail." },
        { status: 400 }
      );
    }

    const API_KEY = process.env.ECOMAIL_API_KEY;
    const LIST_ID = process.env.ECOMAIL_LIST_ID; // e.g. "1"
    if (!API_KEY || !LIST_ID) {
      return NextResponse.json(
        { ok: false, error: "Chybí ECOMAIL_API_KEY nebo ECOMAIL_LIST_ID." },
        { status: 500 }
      );
    }

    const url = `https://api2.ecomailapp.cz/lists/${encodeURIComponent(LIST_ID)}/subscribe`;

    const payload = {
      subscriber_data: { email },     // you can add other fields later
      update_existing: true,          // update if the contact already exists
      resubscribe: true,              // re-subscribe if previously unsubscribed
      skip_confirmation: true,        // don't send DOI (you said it's off)
    };

    const ecRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        key: API_KEY, // Ecomail v2 API header
      } as Record<string, string>,
      body: JSON.stringify(payload),
    });

    const text = await ecRes.text().catch(() => "");
    // Ecomail usually returns JSON; keep raw text for debugging too
    if (!ecRes.ok) {
      return NextResponse.json(
        { ok: false, error: "Odeslání do Ecomailu se nezdařilo.", details: text.slice(0, 800) },
        { status: 502 }
      );
    }

    let json: unknown = null;
    try {
      json = JSON.parse(text);
    } catch {
      // ignore, we already have text
    }

    return NextResponse.json({ ok: true, ecomail: json ?? text.slice(0, 800) });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Došlo k chybě při odesílání. Zkuste to prosím znovu." },
      { status: 500 }
    );
  }
}
