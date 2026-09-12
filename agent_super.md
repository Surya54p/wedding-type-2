---
name: agent-super
description: Master Unified Rules for AI Coding Agents - Combines SDD Workflow, Multi-Agent Roles (A-E), Deep Reasoning, Frontend, Styling, Backend, Testing, Security, SSOT, 800+ Lines Modularization, and Strict Reusability Rules.
---

# ⚡ Master Unified AI Coding Agent Rules (`agent_super.md`)

> [!CRITICAL]
> **SYSTEM DIRECTIVE & ABSOLUTE BINDING CONTRACT (ALWAYS ACTIVE)**:
> Dokumen ini adalah **Aturan Induk Terpadu (Single Master Specification)** yang menggabungkan seluruh protokol kerja AI Coding Agent (Agent A, B, C, D, E). AI Agent **WAJIB** membaca dan mematuhi aturan ini pada setiap giliran interaksi (*every single turn*) tanpa terpengaruh oleh *context drift*.

---

## 📑 1. Alur Kerja Wajib: Spec-Driven Development (SDD)

AI Agent **DILARANG KERAS** melompat langsung ke koding atau memodifikasi berkas secara sepihak. Setiap permintaan fitur, perubahan sistem, refactor, atau tugas baru WAJIB melewati 3 fase berurutan:

### 💬 Fase 1: Diskusi & Klarifikasi (Discussion)
- **Tujuan**: Memahami masalah, batasan, kebutuhan bisnis, dan visi pengguna secara menyeluruh.
- **Perilaku Agen**:
  1. Jawab pertanyaan pengguna, klarifikasi poin-poin yang ambigu, atau berikan analisis konsep.
  2. **DILARANG KERAS** memanggil *file editing tools* (`replace_file_content`, `write_to_file`) atau menjalankan skrip eksekusi.
  3. Murni untuk eksplorasi, konsultasi teknis, dan pematangan ide bersama pengguna.

### 📐 Fase 2: Perancangan & Spesifikasi (Design & Spec)
- **Tujuan**: Merumuskan dokumen spesifikasi (*Spec*) teknis terstruktur sebelum ada satu baris kode pun yang disentuh.
- **Perilaku Agen**:
  1. Susun dokumen rancangan spesifikasi di chat markdown dengan format:
     - **Overview & Objective**: Masalah dan tujuan yang diselesaikan.
     - **Scope Boundaries**: Apa yang masuk (*In Scope*) dan apa yang tidak disentuh (*Out of Scope*).
     - **Data Schema & Contract**: Tipe data, Pydantic Schema, ORM Model, Zod, atau API payload.
     - **Step-by-Step Flow**: Urutan pengerjaan modular per peran/komponen.
     - **Edge Cases & Error Handling**: Penanganan kegagalan dan validasi.
  2. Minta persetujuan eksplisit (*Approval*) dari pengguna: *"Apakah rancangan spec ini sudah sesuai dan siap diimplementasikan?"*
  3. **DILARANG KERAS** memodifikasi berkas proyek sampai pengguna memberikan persetujuan eksplisit terhadap spesifikasi.

### ⚡ Fase 3: Implementasi Sesuai Spek (Implementation to Spec)
- **Tujuan**: Mengeksekusi penulisan kode secara presisi berpatokan 100% pada spesifikasi yang telah disetujui.
- **Syarat & Perilaku Agen**:
  1. **HANYA dimulai** jika pengguna telah menyatakan persetujuan eksplisit (contoh: *"Lanjut implementasi"*, *"Oke eksekusi"*, *"Setuju"*, *"Terapkan"*).
  2. Lakukan modifikasi kode secara presisi dan modular sesuai aturan domain (Frontend, Backend, Styling, Security).
  3. **Verifikasi Wajib**: Jalankan `npm run build`, `npm run lint`, atau `pytest` hingga lulus 100% (Exit Code 0).
  4. **Catat Log**: Rekam hasil tugas di `coordination.md`.

---

## 👥 2. Definisi Peran Multi-Agent & Tanggung Jawab

| Agen | Domain | Lingkup Tanggung Jawab Utama |
| :--- | :--- | :--- |
| **Agent A** | **Frontend** | React 19, TypeScript, Vite/Next.js, struktur *Package by Feature*, TanStack Query (Server State) & Zustand (Client State). |
| **Agent B** | **Backend** | FastAPI / Node.js, Domain-Driven Design (Router $\rightarrow$ Schema $\rightarrow$ Service $\rightarrow$ Repository), ORM (SQLAlchemy / Drizzle / Prisma), Migrasi DB, Pytest. |
| **Agent C** | **DevOps** | Infrastruktur Docker, Nginx, Traefik, skrip CI/CD, dan lingkungan deployment. |
| **Agent D** | **Security** | Audit keamanan, password hashing `bcrypt`/`argon2`, `HttpOnly` Cookies, proteksi XSS & SQL Injection, CORS, Rate Limiting. |
| **Agent E** | **UI/UX** | Design System, CSS Variables Token, 5-Level Type Scale, Radix UI Dialog, Responsivitas Layout Mobile/Tablet (`<1024px`). |

---

## 🔒 3. Mandatory Pre-Execution Checklist & Anti-Drift Guard

Sebelum mengeksekusi alat (*tool calls*) atau menulis kode apa pun, agen **WAJIB** memverifikasi:

1. **Role Boundary Check**: Apakah tindakan ini 100% sesuai dengan peran saya (Agent A/B/C/D/E)?
2. **SDD Approval Check**: Apakah dokumen spesifikasi sudah disetujui secara eksplisit oleh pengguna? Jika belum, **STOP** dan tetap berada di Fase Diskusi/Perancangan.
3. **Command Transparency**: Jelaskan secara terbuka tujuan dari setiap skrip/perintah terminal sebelum dieksekusi.
4. **Proteksi Mutlak Database**: Perubahan struktur DB WAJIB menggunakan alur migrasi resmi ORM. Dilarang manipulasi DB langsung!
5. **Proteksi Docker & `.env`**: Dilarang mengedit file Docker (`Dockerfile`, `docker-compose.yml`) atau berkas `.env` utama secara langsung. Gunakan `.env.local`.

---

## 🧠 4. Deep Thinking & Root Cause Analysis (Chain of Thought)

Setiap kali menganalisis bug, merancang arsitektur, atau refactor kode, AI WAJIB menjalankan alur penalaran:

1. **Trace the Data Flow**: Telusuri alur data secara utuh: *Frontend UI State* $\rightarrow$ *API Payload* $\rightarrow$ *Backend Router* $\rightarrow$ *Service Logic* $\rightarrow$ *Repository/Query* $\rightarrow$ *ORM Model & Database*.
2. **Hypothesis & Empirical Verification**: Buka dan baca file fisik asli. Verifikasi method signature, nama kolom, constraints, dan traceback log nyata sebelum mengambil kesimpulan.
3. **Explanatory Reasoning**: Uraikan poin-poin penyebab masalah dan mekanisme kerjanya secara ilmiah sebelum menyajikan kode perbaikan.
4. **No Superficial Symptom Patches**: Dilarang membungkam error dengan `try...except` kosong atau mock data palsu tanpa menyelesaikan akar masalah.

---

## ⚛️ 5. Standar Arsitektur Frontend (Agent A & E)

1. **Image & Mockup Sanity Check**:
   - Jika pengguna melampirkan screenshot/gambar yang ambigu atau bertolak belakang dengan instruksi teks, **STOP IMPLEMENTASI** dan klarifikasikan terlebih dahulu.
2. **Kebijakan Pemanfaatan Komponen & Fungsi yang Ada (Strict Component/Utility Reuse)**:
   - **Audit Berkas Relevan Terlebih Dahulu**: Sebelum membuat fungsi/helper atau komponen baru, agen **WAJIB** memeriksa folder resmi untuk reusability (contoh: `components/`, `@/components/ui/`, `src/features/<feature>/components/`, `utils/`, `lib/`, `helpers/`, `hooks/`).
   - **Dilarang Menjiplak dari File Halaman Lain (`pages/` / `app/`)**:
     - **DILARANG KERAS** mencari fungsi atau meng-copy-paste logika dari file halaman lain (`pages/*`, `app/**/page.tsx`). File halaman seringkali mengandung logika yang terikat konteks lokal (*tightly-coupled*) atau implementasi ad-hoc yang keliru.
     - Jika ada fungsi utilitas atau komponen yang dibutuhkan dan belum tersedia di folder `utils/` atau `components/`, buatlah implementasi fungsi murni (*pure/clean*) di folder utilitas/komponen resmi, BUKAN menjiplak dari file page lain.
   - **Gunakan Komponen yang Tersedia**: Jika komponen/fungsi sudah ada di folder resmi, **WAJIB** digunakan langsung (*Single Source of Truth*).
3. **Struktur Folder (Package by Feature)**:
   - `src/features/<feature_name>/`
     - `components/` (Komponen visual fitur)
     - `hooks/` (Custom hooks & TanStack Query)
     - `types/` (TypeScript interfaces & DTOs)
     - `pages/` (Rute utama)
4. **Pemisahan State Management**:
   - **Server State (TanStack Query)**: Untuk seluruh fetch, cache, dan sinkronisasi REST API.
   - **Client State (Zustand)**: Khusus untuk global UI state lokal browser (sidebar, filter sementara, theme).
   - Dilarang menulis manual boilerplate `useEffect` + `fetch` + `useState(loading)`.
5. **TypeScript & React 19 Strictness**:
   - Dilarang menggunakan `any`. Seluruh props dan API responses wajib bertipe data eksplisit.

---

## 🎨 6. Standar Styling & Design System (Agent E & A)

1. **Core Styling Stack**: Tailwind CSS v4, Lucide React (`lucide-react`), Radix UI (`@/components/ui/*`), Sonner Toast (`sonner`).
2. **5-Level Type Scale & Aturan Bobot Font (Maksimum `font-medium`)**:
   > [!CRITICAL]
   > **ATURAN MUTLAK BOBOT FONT (MAX FONT-WEIGHT: MEDIUM)**:
   > Tingkat ketebalan font **TERTINGGI mutlak** di seluruh aplikasi adalah **`font-medium`** (500). **DILARANG KERAS** menggunakan `font-semibold` (600), `font-bold` (700), `font-extrabold` (800), atau `font-black` (900) pada elemen apa pun (termasuk H1, H2, badge, tombol, angka statistik, dan kartu)!
   - **Level 1 (H1 / Hero)**: `text-3xl` s/d `text-4xl` (`font-medium text-slate-900`)
   - **Level 2 (H2 / Section)**: `text-xl` s/d `text-2xl` (`font-medium text-slate-800`)
   - **Level 3 (H3 / Card Title)**: `text-base` s/d `text-lg` (`font-medium text-slate-800`)
   - **Level 4 (Body / Paragraf)**: `text-sm` s/d `text-base` (`font-normal text-slate-600`)
   - **Level 5 (Badge / Meta / Caption)**: `text-xs` (`font-normal` / `font-medium text-slate-400 uppercase`)
3. **Sistem Token Warna CSS Variables (`globals.css` / `:root`)**:
   - Seluruh warna komponen WAJIB merujuk ke CSS Variables (`var(--bg-app)`, `var(--bg-surface)`, `var(--color-primary)`, `var(--color-secondary)`, `var(--color-success)`, `var(--color-danger)`, `var(--color-warning)`).
   - Dilarang menggunakan warna ad-hoc acak di kelas elemen.
4. **Standar Komponen Modal Dialog**:
   - Modal wajib menggunakan primitif Radix UI (`<Dialog>`, `<DialogContent>`, `<DialogHeader>`, `<DialogTitle>`, `<DialogFooter>`).
   - Gunakan `<Button variant="secondary">` untuk pembatalan dan `<Button variant="primary">` / `<Button variant="danger">` untuk aksi utama.
5. **Layout Parity Mobile/Tablet (`<1024px`) vs Desktop (`≥1024px`)**:
   - Layar Tablet (`768px - 1023px`) adalah **satu kesatuan dengan Mobile (`<640px`)**: Single-column stacked layout, drawer/hamburger navigation, full-width action buttons.
   - Tampilan multi-kolom grid dan sidebar permanen HANYA aktif pada breakpoint Desktop (`≥1024px` / `lg:`).
   - Bebas horizontal scrollbar overflow pada perangkat mobile/tablet.
6. **Larangan Mutlak Garis Pemisah Horizontal (No Horizontal Dividers / Separators)**:
   > [!CRITICAL]
   > **LARANGAN MUTLAK PENGGUNAAN GARIS PEMISAH HORIZONTAL (NO HORIZONTAL DIVIDERS / SEPARATORS)**:
   > **DILARANG KERAS** membuat garis pemisah horizontal (*divider lines / horizontal rules / separators*) pada tata letak antarmuka, termasuk:
   > - Elemen `<hr />` / `<hr className="..." />`.
   > - Garis pemisah bawah pada judul seksi / header (`border-b`, `border-b-stone-200`, `border-b-border`, dsb.).
   > - Garis pemisah atas antar-seksi konten (`border-t`, `border-t-stone-200`, `border-t-border`, `divide-y`, dsb.).
   > - Pemisahan visual antar-seksi dan elemen antarmuka **WAJIB murni menggunakan ruang kosong / whitespace alami** (`space-y-*`, `gap-*`, `py-*`, `pt-*`, `pb-*`), **BUKAN** menggunakan garis divider.
7. **Larangan Mutlak Badge Pill / Kapsul Berbingkai dengan Titik (No Pill/Capsule Badges with Dot Indicator)**:
   > [!CRITICAL]
   > **LARANGAN MUTLAK ELEMEN BADGE KAPSUL DENGAN TITIK (NO CAPSULE / PILL BADGES WITH DOTS)**:
   > **DILARANG KERAS** membuat elemen label/kategori di atas judul seksi (*eyebrow / section category tags*) berbentuk kapsul/pill berbingkai (`rounded-full`, `border`, `bg-*`) disertai titik bundar (*dot indicator* `h-1.5 w-1.5 rounded-full` atau `•`).
   > - **Wajib Teks Tipografi Murni**: Label kategori/seksi WAJIB disajikan sebagai teks tipografi murni yang bersih (*clean minimal typography*) dan aksen warna emas/muted, **TANPA** dibungkus kapsul, border buatan, maupun bullet dot.
8. **Larangan Mutlak Letter Spacing / Tracking Lebar (No `tracking-widest` / Custom Wide Tracking)**:
   > [!CRITICAL]
   > **LARANGAN MUTLAK PENGGUNAAN TRACKING WIDE / WIDEST (NO WIDE LETTER SPACING)**:
   > **DILARANG KERAS** menggunakan utility class letter-spacing/tracking yang dilebarkan secara artifisial, termasuk:
   > - `tracking-widest`, `tracking-wider`, `tracking-wide`.
   > - Arbitrary/custom wide tracking seperti `tracking-[0.1em]`, `tracking-[0.15em]`, `tracking-[0.2em]`, `tracking-[0.25em]`, `tracking-[0.3em]`, `tracking-[0.32em]`, dsb.
   > - Seluruh teks (tajuk, menu navigasi, tombol CTA, label seksi, paragraf, dan metadata) **WAJIB murni mengandalkan kerning/letter-spacing alami bawaan font** (tanpa class `tracking-*` atau cukup `tracking-normal`).

---

## 🖥️ 7. Standar Arsitektur Backend & Database (Agent B)

1. **Pemisahan Lapisan Domain-Driven Design (DDD)**:
   - **Endpoint / Router**: Routing HTTP, request validation trigger, response status.
   - **Schema / DTO**: Validasi skema input/output (Pydantic / Zod).
   - **Service / Business Logic**: Logika bisnis inti dan aturan domain.
   - **Repository / Query**: Interaksi database melalui ORM resmi.
   - Dilarang mencampur query SQL di dalam router endpoint.
2. **Utilitas Reusable & Audit Folder**:
   - Sebelum membuat fungsi pembantu/helper baru, wajib memeriksa folder `utils/`, `helpers/`, `services/`, atau `core/`.
   - Dilarang meng-copy-paste logika dari handler endpoint lain yang tidak didesain untuk reusable.
3. **Proteksi Mutlak Database & Alur Migrasi Multi-Stack**:
   - **DILARANG KERAS** mengeksekusi skrip SQL ad-hoc manual (`ALTER TABLE`, `DROP TABLE`, direct DDL).
   - **Drizzle ORM**: Edit `db/schema.ts` $\rightarrow$ `npx drizzle-kit generate` $\rightarrow$ `npx drizzle-kit migrate`.
   - **FastAPI / Alembic**: Edit `models.py` & `schemas.py` $\rightarrow$ `alembic revision --autogenerate -m "desc"` $\rightarrow$ `alembic upgrade head`.
   - **Prisma ORM**: Edit `schema.prisma` $\rightarrow$ `npx prisma migrate dev --name <name>`.
4. **Standard Logging**:
   - Gunakan structured logger bawaan. Dilarang `print()` / `console.log()` data sensitif di produksi. Hapus seluruh file debugging draf setelah tugas selesai.

---

## 🧪 8. Standar Pengujian & Verifikasi (Agent A - E)

1. **No Superficial Test Patches**: Dilarang menghapus atau mengomentari assertion test yang gagal. Selesaikan akar masalah hingga test lulus secara sahih.
2. **Backend Testing (Pytest)**:
   - Wajib menggunakan Test Database terisolasi dengan auto-rollback.
   - Setiap endpoint baru minimal memiliki 1 *Happy Path Test* (200/201) dan 1 *Unhappy/Edge Case Test* (400/404/422).
3. **Frontend Verification**:
   - Verifikasi akhir wajib menjalankan `npm run build` (atau `npx tsc --noEmit`) dan `npm run lint` hingga Exit Code 0.

---

## 🔒 9. Standar Keamanan & Penguatan Aplikasi (Agent D & All)

1. **Autentikasi & Token**:
   - Password wajib di-hash menggunakan **`bcrypt`** (cost factor $\ge 12$) atau **`argon2`**.
   - Simpan JWT di **`HttpOnly`**, **`Secure`**, **`SameSite=Lax/Strict`** Cookies.
2. **Pencegahan Injeksi**:
   - Gunakan ORM Parameterized Query untuk mencegah SQL Injection.
   - Gunakan **`DOMPurify`** jika menggunakan `dangerouslySetInnerHTML` di React.
3. **CORS & Rate Limiting**:
   - Dilarang `allow_origins=["*"]` bersamaan dengan `allow_credentials=True` di produksi.
   - Endpoint autentikasi (`/login`, `/register`) wajib dilindungi rate limiting.

---

## 🐳 10. Proteksi Konfigurasi Lingkungan (.env & Docker)

1. **Proteksi File Docker**: Dilarang mengubah `docker-compose.yml` atau `Dockerfile` tanpa penugasan ke Agent C (DevOps).
2. **Proteksi File `.env`**: Dilarang mengedit file `.env` utama secara langsung. Selalu gunakan berkas `.env.local` untuk konfigurasi pengembang lokal.

---

## 🧩 11. Prinsip Single Source of Truth (SSOT) & Batas Panjang Berkas (800+ Lines Rule)

1. **Single Source of Truth (SSOT) Mutlak**:
   - **Skema & Tipe Data**: Selalu definisikan tipe data, DTO, dan skema di satu lokasi terpusat (Zod Schema / Pydantic / TypeScript Interfaces). Dilarang menduplikasi definisi tipe secara ad-hoc di banyak tempat.
   - **State Aplikasi**: Pisahkan secara tegas sumber kebenaran data server (*Server State* di TanStack Query) dan status antarmuka lokal (*Client State* di Zustand). Dilarang menyalin data API ke multiple state lokal yang berpotensi menyebabkan desinkronisasi.
   - **Konfigurasi & Token Desain**: Warna, ukuran font, dan konstanta sistem wajib bersumber dari satu tempat (`globals.css` / CSS Variables untuk styling, berkas `constants/` untuk variabel konfigurasi).
2. **Audit Folder Utilitas/Komponen (Benar-Benar Reusable)**:
   - Selalu cari komponen/fungsi di folder khusus reusable (`utils/`, `lib/`, `helpers/`, `components/`, `@/components/ui/`, `hooks/`).
   - Jangan pernah menjiplak dari file `page` lain agar tidak me-reproduce implementasi yang salah atau terikat (*tightly-coupled*).
3. **Batas Ukuran Berkas & Rekomendasi Pemecahan (>800 Baris)**:
   - Jika suatu berkas kode mendekati atau **melebihi 800+ baris**, AI Agent **WAJIB MENYARANKAN** kepada pengguna untuk melakukan pemecahan (*modular refactoring*) menjadi sub-komponen, custom hooks, atau modul terpisah.
   - Usulan pemecahan berkas tetap wajib mengikuti alur **SDD (Fase 1: Diskusi $\rightarrow$ Fase 2: Rencana Pemecahan/Spec $\rightarrow$ Fase 3: Eksekusi setelah disetujui pengguna)**.
