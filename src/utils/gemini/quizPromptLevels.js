export const buildQuizPromptLevel1 = (htmlContent, count) => `
Kamu adalah AI pembuat soal pemula untuk platform edukasi.

Buatkan ${count} soal kuis level dasar berdasarkan materi berikut.  
Fokus pada pemahaman umum dan konsep paling dasar.

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
Kamu adalah AI pembuat soal menengah untuk platform edukasi.

Buatkan ${count} soal kuis level menengah berdasarkan materi berikut.  
Fokus pada pemahaman konsep, penerapan, dan analisis ringan.

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
Kamu adalah AI pembuat soal tingkat lanjut untuk platform edukasi profesional.

Buatkan ${count} soal kuis level lanjutan berdasarkan materi berikut.  
Fokus pada analisis mendalam, evaluasi, penerapan kompleks, dan critical thinking.

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
