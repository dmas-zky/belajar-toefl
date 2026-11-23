# TOEFL Prep - Platform Belajar & Simulasi TOEFL H-1

Aplikasi web persiapan ujian TOEFL ITP yang dirancang khusus untuk pemula dengan pendekatan pengenalan pola kalimat (*pattern recognition*). Didesain dengan prinsip **Unslop** (antarmuka tenang, minimalis, dan fungsional tanpa distraksi visual berlebihan).

---

## Fitur Utama

- **Pola & Aturan Inti (Crash Course)**
  - Aturan emas mendengarkan pembicara kedua (*Listening Comprehension*).
  - 6 rumus gramatikal utama (*Structure & Written Expression*): Subjek-Predikat, Kalimat Pasif, Kata Hubung, Kesejajaran Struktur (*Parallelism*), Modal Auxiliaries, dan Kelas Kata (*Adjective vs Adverb*).
  - Teknik membaca efisien (*Reading Comprehension*) tanpa membaca kata demi kata.
  - 24 kosakata akademis esensial lengkap dengan definisi, sinonim, dan pelafalan audio penutur asli.

- **Audio Percakapan Penutur Asli (Text-to-Speech)**
  - Soal *Listening* terintegrasi dengan Web Speech API bawaan browser untuk memutar dialog beraksen *US English*.
  - Dilengkapi fitur peninjauan naskah dialog (*transcript*).

- **Latihan Terbimbing (Drill Mode)**
  - Pengerjaan soal mandiri per kategori (Listening, Structure, Reading).
  - Umpan balik dan analisis pembahasan pola kalimat secara instan pada setiap pilihan jawaban.

- **Simulasi Ujian Mandiri (Exam Mode)**
  - 30 butir soal pilihan ganda standar TOEFL ITP terkalibrasi.
  - Penghitung waktu mundur 30 menit dan palet navigasi nomor soal.
  - Estimasi perolehan skor akhir konversi skala TOEFL ITP (310 – 677) beserta rincian akurasi per sesi.

- **Mode Gelap & Terang**
  - Tampilan visual responsif dengan dukungan tema gelap dan terang yang tersimpan di memori lokal (*localStorage*).

---

## Struktur Berkas

```text
├── index.html         # Halaman utama aplikasi (SPA)
├── index.php          # Entrypoint fallback untuk server PHP/Apache
├── css/
│   └── style.css      # Styling kustom (indikator audio, scrollbar, hairline borders)
├── js/
│   ├── data.js        # Basis data materi, kosakata, dan 30 butir soal TOEFL
│   └── app.js         # Logika navigasi, audio player, timer ujian, dan penilaian
└── .agent/
    └── skills/
        └── unslop/    # Skill audit desain antarmuka (heydamir/unslop)
```

---

## Cara Menjalankan

1. **Buka Langsung di Browser:**
   Klik dua kali berkas `index.html` menggunakan browser modern (Google Chrome, Microsoft Edge, Mozilla Firefox, dll).

2. **Melalui Server Lokal (XAMPP / Apache):**
   - Letakkan folder project di direktori `c:/xampp/htdocs/toefl`.
   - Jalankan modul **Apache** pada XAMPP Control Panel.
   - Buka browser dan akses alamat: `http://localhost/toefl`
