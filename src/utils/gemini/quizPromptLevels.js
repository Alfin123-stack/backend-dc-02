const OUTPUT_RULES = `
====================================================================
INSTRUKSI OUTPUT WAJIB (HARUS DIIKUTI 100%)
====================================================================
1. Output akhir HARUS berupa JSON array valid.
   - Tanpa markdown
   - Tanpa teks tambahan

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
- multiple_answer → wajib 2–3 jawaban benar

4. JSON HARUS VALID:
- Tidak boleh ada trailing comma
- Hanya keluarkan JSON array murni
====================================================================
OUTPUT HARUS JSON ARRAY VALID
====================================================================
`;

export const buildQuizPromptLevel1 = (htmlContent, count) => `
Kamu adalah AI pembuat soal **level dasar** untuk platform edukasi.

Tugas kamu adalah membuat ${count} soal kuis yang **benar-benar variatif**
dan **tidak mengulang pola pertanyaan**.

Fokus soal:
- pengenalan konsep paling dasar
- bahasa sederhana dan langsung
- satu konsep inti per soal

Setiap soal HARUS berbeda dari sisi:
- cara bertanya
- sudut pandang kalimat
- konteks sederhana
- fokus konsep yang diuji

Gunakan variasi pendekatan:
- definisi
- fungsi
- contoh
- tujuan
- manfaat
- identifikasi elemen penting

 Hindari struktur soal yang mirip meskipun topiknya sama.

=== MATERI DIMULAI ===
${htmlContent}
=== MATERI SELESAI ===

Tambahan aturan khusus:
- Soal boleh sederhana, tetapi tidak monoton
- Feedback harus singkat, jelas, dan langsung ke inti materi

${OUTPUT_RULES}
`;

export const buildQuizPromptLevel2 = (htmlContent, count) => `
Kamu adalah AI pembuat soal **level menengah** untuk platform edukasi.

Buat ${count} soal kuis yang **beragam**, **tidak repetitif**, dan
menuntut **pemahaman konseptual**, bukan sekadar hafalan.

Soal harus melatih kemampuan:
- memahami hubungan antar konsep
- menemukan alasan atau penyebab
- membandingkan konsep
- memilih contoh yang tepat
- mengidentifikasi kesalahan konsep
- menafsirkan situasi atau ilustrasi sederhana

 Hindari pengulangan:
- pola kalimat
- struktur pertanyaan
- gaya berpikir yang sama

Setiap soal harus memiliki pendekatan unik.

=== MATERI DIMULAI ===
${htmlContent}
=== MATERI SELESAI ===

Tambahan aturan khusus:
- Soal harus mendorong pemahaman & interpretasi
- Feedback harus menjelaskan **alasan benar dan salah**

${OUTPUT_RULES}
`;

export const buildQuizPromptLevel3 = (htmlContent, count) => `
Kamu adalah AI pembuat soal **tingkat lanjut** untuk platform edukasi profesional.

Buat ${count} soal yang:
- sangat menantang secara logika
- unik dan tidak repetitif
- menguji pemikiran tingkat tinggi

 PENTING:
- Pertanyaan HARUS RINGKAS (maks. 1–2 kalimat inti)
- Kompleksitas berasal dari **pemikiran**, bukan panjang kalimat
- Jangan gunakan narasi panjang atau cerita bertele-tele

Gunakan pendekatan sulit seperti:
- evaluasi keputusan implisit
- analisis konsekuensi logis
- identifikasi kesalahan asumsi
- perbandingan dua pendekatan tanpa disebut eksplisit
- penerapan konsep pada kondisi baru yang disederhanakan
- memilih solusi paling tepat dari opsi yang sama-sama terlihat benar

Setiap soal harus:
- cepat dipahami saat dibaca
- namun membutuhkan analisis mendalam
- memiliki sudut pandang berbeda satu sama lain

=== MATERI DIMULAI ===
${htmlContent}
=== MATERI SELESAI ===

Tambahan aturan khusus:
- Soal menguji analisis, evaluasi, dan pengambilan keputusan
- Feedback boleh lebih panjang dari soal
- Feedback harus menjelaskan logika pemilihan jawaban

${OUTPUT_RULES}
`;
