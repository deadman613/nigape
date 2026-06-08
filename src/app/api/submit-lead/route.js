import { NextResponse } from "next/server";

function normalizeAppsScriptUrl(rawUrl) {
  if (!rawUrl) {
    return "";
  }

  return rawUrl.trim().replace(/^['\"]|['\"]$/g, "");
}

export async function POST(request) {
  try {
    const body = await request.text();
    const appsScriptUrl = normalizeAppsScriptUrl(process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL);

    if (!appsScriptUrl) {
      return NextResponse.json({ ok: false, error: "Apps Script URL not configured" }, { status: 500 });
    }

    try {
      new URL(appsScriptUrl);
    } catch {
      return NextResponse.json({ ok: false, error: `Invalid Apps Script URL: ${appsScriptUrl}` }, { status: 500 });
    }

    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      redirect: "follow",
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { ok: true };
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err?.message ?? err) }, { status: 500 });
  }
}
