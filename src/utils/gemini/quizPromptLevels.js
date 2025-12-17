const OUTPUT_RULES = `
====================================================================
INSTRUKSI OUTPUT WAJIB (HARUS DIIKUTI 100%)
====================================================================
1. Output akhir HARUS berupa JSON array valid.
   - Tanpa markdown
   - Tanpa teks tambahan
   - Tanpa komentar apa pun

2. Struktur setiap soal:
{
  "question": "",
  "type": "multiple_choice" | "multiple_answer",
  "options": {
    "A": { "text": "", "isCorrect": false, "feedback": "" },
    "B": { "text": "", "isCorrect": false, "feedback": "" },
    "C": { "text": "", "isCorrect": false, "feedback": "" },
    "D": { "text": "", "isCorrect": false, "feedback": "" },
    "E": { "text": "", "isCorrect": false, "feedback": "" }
  }
}

3. Aturan tipe soal:
- multiple_choice → hanya 1 jawaban benar
- multiple_answer → WAJIB 2–3 jawaban benar

4. KOMPOSISI TIPE SOAL (WAJIB):
- Dari total soal, MINIMAL 60% HARUS bertipe "multiple_answer"
- Maksimal 40% boleh "multiple_choice"
- Jika jumlah tidak genap, BULATKAN KE ATAS untuk "multiple_answer"

5. VALIDASI SEBELUM OUTPUT:
- Hitung jumlah soal "multiple_answer"
- Pastikan jumlahnya LEBIH BANYAK daripada "multiple_choice"
- Jika belum terpenuhi, PERBAIKI sebelum mengeluarkan JSON

6. JSON HARUS VALID:
- Tidak boleh ada trailing comma
- Tidak boleh ada key tambahan
- Tidak boleh ada nilai null atau undefined
====================================================================
OUTPUT HARUS JSON ARRAY VALID
====================================================================
`;

export const buildQuizPromptLevel1 = (htmlContent, count) => `
Kamu adalah AI pembuat soal **LEVEL DASAR** untuk platform edukasi.

Tugas kamu adalah membuat ${count} soal kuis yang:
- sangat variatif
- tidak mengulang pola pertanyaan
- mudah dipahami pemula
- tetap berkualitas

Fokus soal:
- pengenalan konsep inti
- bahasa sederhana & langsung
- satu konsep utama per soal

Gunakan variasi pendekatan:
- definisi
- fungsi
- tujuan
- manfaat
- contoh sederhana
- identifikasi ciri dasar

ATURAN TAMBAHAN TIPE SOAL LEVEL DASAR:
- PRIORITASKAN "multiple_answer" meskipun soal sederhana
- Gunakan "multiple_answer" untuk:
  - memilih beberapa ciri yang benar
  - mengenali beberapa contoh yang tepat
  - mengidentifikasi fungsi atau tujuan
- Gunakan "multiple_choice" HANYA jika konsep benar-benar tunggal

Hindari:
- pola kalimat serupa
- pertanyaan dengan struktur yang mirip
- soal monoton meskipun topiknya sama

=== MATERI DIMULAI ===
${htmlContent}
=== MATERI SELESAI ===

Tambahan aturan:
- Soal boleh sederhana, tetapi tidak dangkal
- Feedback singkat, jelas, dan langsung ke inti

${OUTPUT_RULES}
`;

export const buildQuizPromptLevel2 = (htmlContent, count) => `
Kamu adalah AI pembuat soal **LEVEL MENENGAH** untuk platform edukasi.

Buat ${count} soal kuis yang:
- beragam
- tidak repetitif
- menuntut pemahaman konseptual
- bukan sekadar hafalan

Soal harus melatih:
- hubungan antar konsep
- sebab–akibat
- perbandingan konsep
- identifikasi kesalahan pemahaman
- interpretasi situasi sederhana

ATURAN TAMBAHAN TIPE SOAL LEVEL MENENGAH:
- "multiple_answer" adalah DEFAULT
- Gunakan "multiple_answer" untuk:
  - membandingkan beberapa pernyataan
  - memilih beberapa konsep yang benar
  - mengidentifikasi lebih dari satu kesalahan
- Gunakan "multiple_choice" hanya jika analisis berujung pada satu kesimpulan mutlak

Hindari:
- pengulangan pola kalimat
- struktur pertanyaan seragam
- gaya berpikir yang sama di banyak soal

=== MATERI DIMULAI ===
${htmlContent}
=== MATERI SELESAI ===

Tambahan aturan:
- Feedback harus menjelaskan alasan benar & salah
- Jawaban salah tetap harus masuk akal

${OUTPUT_RULES}
`;

export const buildQuizPromptLevel3 = (htmlContent, count) => `
Kamu adalah AI pembuat soal **LEVEL LANJUT** untuk platform edukasi profesional.

Buat ${count} soal yang:
- menantang secara logika
- unik dan tidak repetitif
- menguji pemikiran tingkat tinggi

PENTING:
- Pertanyaan HARUS RINGKAS (maks. 1–2 kalimat inti)
- Kompleksitas berasal dari pemikiran, bukan panjang kalimat
- Jangan gunakan narasi panjang

Gunakan pendekatan:
- evaluasi asumsi tersembunyi
- analisis konsekuensi logis
- identifikasi kesalahan penalaran
- penerapan konsep pada kondisi baru
- memilih beberapa solusi yang sama-sama terlihat benar

ATURAN TAMBAHAN TIPE SOAL LEVEL LANJUT:
- SEBISA MUNGKIN gunakan "multiple_answer"
- "multiple_answer" digunakan untuk:
  - analisis multi-aspek
  - evaluasi beberapa opsi valid
  - pengambilan keputusan kompleks
- "multiple_choice" hanya jika:
  - hanya SATU keputusan paling optimal yang benar

Setiap soal harus:
- cepat dipahami saat dibaca
- tetapi membutuhkan analisis mendalam
- memiliki sudut pandang berbeda

=== MATERI DIMULAI ===
${htmlContent}
=== MATERI SELESAI ===

Tambahan aturan:
- Feedback boleh lebih panjang dari soal
- Feedback harus menjelaskan logika pemilihan jawaban

${OUTPUT_RULES}
`;
