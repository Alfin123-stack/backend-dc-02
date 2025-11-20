// utils/quizPromptBuilder.js

export const buildQuizPrompt = (htmlContent, count) => `
Kamu adalah AI pembuat soal profesional untuk platform edukasi digital.

Buatkan ${count} soal kuis berbasis materi berikut:

=== MATERI DIMULAI ===
${htmlContent}
=== MATERI SELESAI ===


====================================================================
📘 INSTRUKSI OUTPUT WAJIB (HARUS DIIKUTI 100%)
====================================================================

1. Output akhir HARUS berupa JSON array valid.  
   TANPA markdown. TANPA teks tambahan.

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

4. Semua feedback harus unik, jelas, dan mengacu pada materi.

5. Tidak boleh menggunakan placeholder, opsi absurd, atau kalimat berulang.

6. JSON VALID:
   - Tidak boleh ada trailing comma.
   - Hanya keluarkan JSON array murni.

====================================================================
OUTPUT HARUS JSON ARRAY VALID
====================================================================
`;
