import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

let memoryReservations = [
  {
    id: "rsv-1",
    name: "Aditya Pratama",
    attendance: "Akan Hadir",
    message: "Selamat atas pernikahannya Aris & Hana! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "rsv-2",
    name: "Clarissa Wijaya",
    attendance: "Akan Hadir",
    message: "Happy wedding Hana & Aris! You both look so wonderful together. Wishing you endless love and happiness!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: "rsv-3",
    name: "Dimas Prasetyo",
    attendance: "Belum Bisa Hadir",
    message: "Mohon maaf belum bisa hadir secara langsung karena sedang di luar kota. Doa terbaik untuk kedua mempelai!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "rsv-4",
    name: "Reza & Maya",
    attendance: "Akan Hadir",
    message: "Selamat menempuh hidup baru! Semoga selalu kompak dan bahagia selalu ya.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

export async function GET() {
  try {
    if (process.env.DATABASE_URL) {
      const data = await prisma.guestbook.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (data && data.length > 0) {
        const parsed = data.map((item) => {
          const match = item.message.match(/^\[(.*?)\]\s*(.*)$/);
          return {
            id: item.id,
            name: item.name,
            attendance: match ? match[1] : "Akan Hadir",
            message: match ? match[2] : item.message,
            createdAt: item.createdAt.toISOString(),
          };
        });
        return NextResponse.json(parsed);
      }
    }
  } catch {
    // Fallback smoothly if DB is not configured or reachable
  }

  return NextResponse.json(memoryReservations);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, message, attendance } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Nama tamu wajib diisi" },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    if (trimmedName.length > 100) {
      return NextResponse.json(
        { error: "Nama tamu maksimal 100 karakter" },
        { status: 400 }
      );
    }

    const trimmedMessage = message && typeof message === "string" ? message.trim().slice(0, 500) : "";

    const isNotAttending =
      attendance === "Belum Bisa Hadir" ||
      attendance === "Berhalangan" ||
      attendance === "Tidak Hadir";

    const attendanceStatus = isNotAttending ? "Belum Bisa Hadir" : "Akan Hadir";

    const newReservation = {
      id: "rsv-" + Date.now(),
      name: trimmedName,
      attendance: attendanceStatus,
      message: trimmedMessage,
      createdAt: new Date().toISOString(),
    };

    try {
      if (process.env.DATABASE_URL) {
        await prisma.guestbook.create({
          data: {
            name: newReservation.name,
            message: `[${attendanceStatus}] ${newReservation.message}`,
          },
        });
      }
    } catch {
      // Continue with in-memory persistence
    }

    memoryReservations = [newReservation, ...memoryReservations];
    return NextResponse.json(newReservation, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


