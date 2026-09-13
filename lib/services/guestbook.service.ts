import { prisma } from "@/lib/prisma";
import { CreateGuestbookInput, GuestbookEntryDTO } from "@/lib/validations/guestbook";

// Initial realistic seed data for Indonesian wedding
const SEED_RESERVATIONS: GuestbookEntryDTO[] = [
  {
    id: "seed-1",
    name: "Aditya Pratama",
    attendance: "Akan Hadir",
    message: "Selamat atas pernikahannya Aris & Hana! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "seed-2",
    name: "Clarissa Wijaya",
    attendance: "Akan Hadir",
    message: "Happy wedding Hana & Aris! You both look so wonderful together. Wishing you endless love and happiness!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: "seed-3",
    name: "Dimas Prasetyo",
    attendance: "Belum Bisa Hadir",
    message: "Mohon maaf belum bisa hadir secara langsung karena sedang dinas di luar kota. Doa terbaik untuk kedua mempelai!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "seed-4",
    name: "Reza & Maya",
    attendance: "Akan Hadir",
    message: "Selamat menempuh hidup baru! Semoga selalu kompak dan bahagia selamanya ya.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

let inMemoryStore: GuestbookEntryDTO[] = [...SEED_RESERVATIONS];
let hasSeededDatabase = false;

export async function getGuestbookList(): Promise<GuestbookEntryDTO[]> {
  try {
    const records = await prisma.guestbook.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (records.length > 0) {
      return records.map((record) => ({
        id: record.id,
        name: record.name,
        attendance: record.attendance as "Akan Hadir" | "Belum Bisa Hadir",
        message: record.message ?? "",
        createdAt: record.createdAt.toISOString(),
      }));
    }

    // Auto-seed initial comments into fresh DB once
    if (!hasSeededDatabase) {
      hasSeededDatabase = true;
      try {
        for (const seed of SEED_RESERVATIONS) {
          await prisma.guestbook.create({
            data: {
              name: seed.name,
              attendance: seed.attendance,
              message: seed.message,
            },
          });
        }
        const refreshed = await prisma.guestbook.findMany({
          orderBy: { createdAt: "desc" },
        });
        if (refreshed.length > 0) {
          return refreshed.map((r) => ({
            id: r.id,
            name: r.name,
            attendance: r.attendance as "Akan Hadir" | "Belum Bisa Hadir",
            message: r.message ?? "",
            createdAt: r.createdAt.toISOString(),
          }));
        }
      } catch {
        // Fallback to in-memory if seeding fails
      }
    }
  } catch {
    // Graceful fallback to memory store if DB is unreachable
  }

  return inMemoryStore;
}

export async function createGuestbookEntry(
  input: CreateGuestbookInput
): Promise<GuestbookEntryDTO> {
  try {
    const created = await prisma.guestbook.create({
      data: {
        name: input.name,
        attendance: input.attendance,
        message: input.message || null,
      },
    });

    const result: GuestbookEntryDTO = {
      id: created.id,
      name: created.name,
      attendance: created.attendance as "Akan Hadir" | "Belum Bisa Hadir",
      message: created.message ?? "",
      createdAt: created.createdAt.toISOString(),
    };

    // Keep memory cache aligned
    inMemoryStore = [result, ...inMemoryStore];
    return result;
  } catch {
    // Fallback persistence in memory
    const fallbackEntry: GuestbookEntryDTO = {
      id: "rsv-" + Date.now(),
      name: input.name,
      attendance: input.attendance,
      message: input.message ?? "",
      createdAt: new Date().toISOString(),
    };
    inMemoryStore = [fallbackEntry, ...inMemoryStore];
    return fallbackEntry;
  }
}
