export const buildQuizPromptLevel1 = (htmlContent, count) => `
Kamu adalah AI pembuat soal *level dasar* untuk platform edukasi.

Tugas kamu adalah membuat ${count} soal kuis yang **benar-benar variatif**, bukan mengulang pola yang sama.  
Setiap soal harus fokus pada konsep paling dasar, namun **harus berbeda satu sama lain**, baik dari sisi:

- cara bertanya  
- sudut pandang kalimat  
- konteks sederhana yang diberikan  
- fokus konsep yang diuji  

Meskipun sederhana, **hindari soal yang serupa secara struktur**.  
Kembangkan sudut pandang berbeda: definisi, fungsi, contoh, tujuan, manfaat, atau identifikasi elemen penting dari materi.

=== MATERI DIMULAI ===
${htmlContent}
=== MATERI SELESAI ===


====================================================================
📘 INSTRUKSI OUTPUT WAJIB (HARUS DIIKUTI 100%)
====================================================================

1. Output akhir HARUS berupa JSON array valid.
   Tanpa markdown. Tanpa teks tambahan.

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
- multiple_choice → hanya 1 jawaban benar.
- multiple_answer → wajib 2–3 jawaban benar.

4. Gunakan bahasa sederhana dan langsung.  
   Fokus pada pengenalan konsep dasar.

5. Feedback harus singkat, jelas, dan sesuai materi.

6. JSON VALID:
   - Tidak boleh ada trailing comma.
   - Hanya keluarkan JSON array murni.

====================================================================
OUTPUT HARUS JSON ARRAY VALID
====================================================================
`;

export const buildQuizPromptLevel2 = (htmlContent, count) => `
Kamu adalah AI pembuat soal *level menengah* untuk platform edukasi.

Buat ${count} soal kuis yang **beragam** dan tidak boleh memiliki pola serupa.  
Setiap soal harus menuntut kemampuan berpikir menengah: pemahaman, alasan, interpretasi, dan hubungan antar konsep.

Untuk menghasilkan soal yang tidak monoton, gunakan variasi:
- perbandingan antar konsep  
- menemukan alasan atau penyebab  
- memilih contoh yang tepat  
- menemukan kesalahan konsep  
- interpretasi ilustrasi atau situasi sederhana  
- membaca makna dari penjelasan  

Selain itu, **hindari mengulang format pertanyaan yang sama**, meskipun isinya berbeda.  
Pastikan setiap soal memiliki pendekatan unik.

=== MATERI DIMULAI ===
${htmlContent}
=== MATERI SELESAI ===


====================================================================
📘 INSTRUKSI OUTPUT WAJIB (HARUS DIIKUTI 100%)
====================================================================

1. Output akhir HARUS berupa JSON array valid.
   Tanpa markdown. Tanpa teks tambahan.

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
- multiple_choice → hanya 1 jawaban benar.
- multiple_answer → wajib 2–3 jawaban benar.

4. Soal harus menuntut pemahaman, bukan sekadar mengingat.  
   (misal: perbandingan, interpretasi, menemukan alasan, menghubungkan konsep)

5. Feedback harus detail dan menjelaskan alasan benar/salah.

6. JSON VALID:
   - Tidak boleh ada trailing comma.
   - Hanya keluarkan JSON array murni.

====================================================================
OUTPUT HARUS JSON ARRAY VALID
====================================================================
`;

export const buildQuizPromptLevel3 = (htmlContent, count) => `
Kamu adalah AI pembuat soal *tingkat lanjut* untuk platform edukasi profesional.

Tugas kamu adalah membuat ${count} soal yang **benar-benar kompleks, unik, dan tidak repetitif**.  
Gunakan sudut pandang yang berbeda untuk tiap soal, seperti:

- analisis mendalam dari skenario nyata  
- studi kasus dengan konteks yang bervariasi  
- perbandingan dua pendekatan  
- penerapan konsep pada situasi baru yang tidak eksplisit di materi  
- identifikasi kesalahan logika  
- evaluasi keputusan atau solusi  

Hindari pertanyaan yang strukturalnya sama.  
Setiap soal harus terasa seperti tantangan baru bagi pelajar tingkat lanjut.

=== MATERI DIMULAI ===
${htmlContent}
=== MATERI SELESAI ===


====================================================================
📘 INSTRUKSI OUTPUT WAJIB (HARUS DIIKUTI 100%)
====================================================================

1. Output akhir HARUS berupa JSON array valid.
   Tanpa markdown. Tanpa teks tambahan.

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
- multiple_choice → hanya 1 jawaban benar.
- multiple_answer → wajib 2–3 jawaban benar.

4. Soal harus menuntut pemikiran tingkat tinggi:  
   - analisis mendalam  
   - evaluasi skenario  
   - studi kasus  
   - penerapan konsep dalam situasi baru  

5. Feedback harus sangat komprehensif, menunjukan alasan logis yang kuat,  
   serta dikaitkan langsung dengan isi materi.

6. JSON VALID:
   - Tidak boleh ada trailing comma.
   - Hanya keluarkan JSON array murni.

====================================================================
OUTPUT HARUS JSON ARRAY VALID
====================================================================
`;
