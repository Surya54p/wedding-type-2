import { z } from "zod";

export const AttendanceStatusEnum = z.enum(["Akan Hadir", "Belum Bisa Hadir"]);
export type AttendanceStatus = z.infer<typeof AttendanceStatusEnum>;

export const createGuestbookSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nama tamu wajib diisi")
    .max(100, "Nama tamu maksimal 100 karakter"),
  attendance: z
    .string()
    .optional()
    .transform((val) => {
      if (
        val === "Belum Bisa Hadir" ||
        val === "Berhalangan" ||
        val === "Tidak Hadir"
      ) {
        return "Belum Bisa Hadir";
      }
      return "Akan Hadir";
    })
    .pipe(AttendanceStatusEnum),
  message: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || typeof val !== "string") return "";
      // Strip potential dangerous HTML tags for anti-XSS safety
      const clean = val.replace(/<[^>]*>?/gm, "").trim();
      return clean.slice(0, 500);
    }),
});

export type CreateGuestbookInput = z.infer<typeof createGuestbookSchema>;

export interface GuestbookEntryDTO {
  id: string;
  name: string;
  attendance: "Akan Hadir" | "Belum Bisa Hadir";
  message: string;
  createdAt: string;
}
