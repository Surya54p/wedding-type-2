import { NextResponse, type NextRequest } from "next/server";
import { createGuestbookSchema } from "@/lib/validations/guestbook";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  getGuestbookList,
  createGuestbookEntry,
} from "@/lib/services/guestbook.service";

export async function GET() {
  try {
    const list = await getGuestbookList();
    return NextResponse.json(list);
  } catch {
    return NextResponse.json(
      { error: "Gagal memuat daftar buku tamu" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting Protection (Max 5 requests/min per IP)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous";

    const rateLimit = checkRateLimit(ip, { limit: 5, windowMs: 60 * 1000 });
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error:
            "Terlalu banyak pengiriman pesan. Mohon tunggu sebentar sebelum mengirim kembali.",
        },
        { status: 429 }
      );
    }

    // 2. Zod Payload Validation & Anti-XSS Sanitization
    const body = await req.json();
    const parseResult = createGuestbookSchema.safeParse(body);

    if (!parseResult.success) {
      const errorMessage =
        parseResult.error.issues[0]?.message || "Data pengiriman tidak valid";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    // 3. Service Layer Execution & Persistence
    const newEntry = await createGuestbookEntry(parseResult.data);
    return NextResponse.json(newEntry, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server" },
      { status: 500 }
    );
  }
}
