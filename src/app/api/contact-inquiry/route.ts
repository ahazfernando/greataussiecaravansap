import { NextResponse } from "next/server";

const GOOGLE_APPS_SCRIPT_URL =
  process.env.GOOGLE_INQUIRY_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbwBY02rCjD3QQDUOjlsQME0OogdRZ-DGcyXzdzCvdcqxlaXzLvM4OjjWpUZl28V9p-r/exec";

type InquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  state?: string;
  postalCode?: string;
  subject?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as InquiryPayload;

    const googlePayload = {
      fullName: payload.name || "",
      email: payload.email || "",
      phone: payload.phone || "",
      state: payload.state || "",
      postalCode: payload.postalCode || "",
      subject: payload.subject || "",
      message: payload.message || "",
      product: "",
      sourcePage: "contact-page",
    };

    const scriptResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(googlePayload),
      cache: "no-store",
    });

    if (!scriptResponse.ok) {
      const errorText = await scriptResponse.text();
      return NextResponse.json(
        {
          error: "Google Sheet sync failed",
          details: errorText || "Unknown Apps Script error",
        },
        { status: 502 }
      );
    }

    const responseText = await scriptResponse.text();
    let responseJson: { success?: boolean; error?: string } | null = null;
    try {
      responseJson = responseText ? JSON.parse(responseText) : null;
    } catch {
      responseJson = null;
    }

    if (responseJson && responseJson.success === false) {
      return NextResponse.json(
        {
          error: "Google Sheet sync failed",
          details: responseJson.error || "Apps Script returned success: false",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to sync inquiry to Google Sheet",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
