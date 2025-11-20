/**
 * 🔹 Versi tampilan HTML (GET /api/ai/generate?tutorialId=1001)
 * Bisa langsung dibuka di browser
//  */
// export const generateQuizDemo = async (req, res) => {
//   const tutorialId = parseInt(req.query.tutorialId) || 35373;

//   // Endpoint API eksternal
//   const tutorialUrl = `https://learncheck-dicoding-mock-666748076441.europe-west1.run.app/api/tutorials/${tutorialId}`;
//   try {
//     // Ambil data dari API eksternal
//     const response = await fetch(tutorialUrl);

//     // Cek apakah response sukses
//     if (!response.ok) {
//       return res
//         .status(response.status)
//         .send(
//           `<h3>❌ Gagal mengambil data dari API (${response.statusText}).</h3>`
//         );
//     }

//     // Parsing hasil JSON
//     const tutorial = await response.json();

//     // Validasi konten
//     if (!tutorial || !tutorial.data.content) {
//       return res
//         .status(404)
//         .send("<h3>❌ Modul tidak ditemukan atau tidak memiliki konten.</h3>");
//     }

//     // Ambil konten HTML
//     const content = tutorial.data?.content || tutorial.content;

//     // Regex untuk ambil teks dalam tag <h2>
//     const h2Match = content.match(/<h2[^>]*>(.*?)<\/h2>/i);
//     const title = h2Match ? h2Match[1].trim() : "Tanpa Judul";

//     // Generate quiz berdasarkan konten tutorial
//     const quiz = await generateQuizFromContent(tutorial.data.content);

//     // 🧩 HTML Template output
//     const htmlOutput = `
//       <!DOCTYPE html>
//       <html lang="id">
//         <head>
//           <meta charset="UTF-8" />
//           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//           <title>Soal dari Gemini AI</title>
//           <style>
//             body {
//               font-family: 'Inter', 'Segoe UI', sans-serif;
//               background-color: #f4f6f8;
//               padding: 2rem;
//               line-height: 1.7;
//               color: #333;
//             }
//             h1 {
//               color: #1d3557;
//               margin-bottom: 0.5rem;
//             }
//             hr {
//               margin: 1rem 0 2rem;
//               border: none;
//               border-top: 2px solid #ccc;
//             }
//             .form-section {
//               margin-bottom: 2rem;
//               padding: 1rem 1.5rem;
//               background: #ffffff;
//               border-radius: 10px;
//               box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//             }
//             input {
//               padding: 0.6rem;
//               border-radius: 6px;
//               border: 1px solid #ccc;
//               width: 120px;
//               margin-right: 0.5rem;
//             }
//             button {
//               background-color: #007bff;
//               color: #fff;
//               border: none;
//               border-radius: 6px;
//               padding: 0.6rem 1.2rem;
//               cursor: pointer;
//               font-weight: 500;
//               transition: 0.2s;
//             }
//             button:hover {
//               background-color: #0056b3;
//             }
//             .question {
//               margin-bottom: 1.5rem;
//               padding: 1.5rem;
//               background: white;
//               border-radius: 10px;
//               box-shadow: 0 2px 6px rgba(0,0,0,0.08);
//             }
//             .question h3 {
//               margin-bottom: 0.75rem;
//             }
//             .options {
//               list-style: none;
//               padding-left: 0;
//               margin-bottom: 0.75rem;
//             }
//             .options li {
//               margin-bottom: 0.5rem;
//               display: flex;
//               align-items: center;
//             }
//             .options input[type="checkbox"] {
//               margin-right: 0.6rem;
//               accent-color: #007bff;
//               transform: scale(1.2);
//             }
//             .answer {
//               background-color: #f1f8e9;
//               padding: 0.6rem 1rem;
//               border-radius: 6px;
//               font-size: 0.95rem;
//               color: #2e7d32;
//               border-left: 4px solid #81c784;
//             }
//             .type-label {
//               display: inline-block;
//               padding: 0.2rem 0.6rem;
//               background-color: #e3f2fd;
//               color: #1565c0;
//               border-radius: 4px;
//               font-size: 0.8rem;
//               margin-left: 0.5rem;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="form-section">
//             <h2>🔍 Generate Soal dari Modul</h2>
//             <form method="GET" action="/api/ai/generate">
//               <label>Masukkan ID Modul:</label>
//               <input name="tutorialId" placeholder="1001" />
//               <button type="submit">Generate</button>
//             </form>
//           </div>

//           <h1>📘 ${title}</h1>
//           <hr />

//           ${quiz
//             .map(
//               (q, i) => `
//                 <div class="question">
//                   <h3>${i + 1}. ${q.question}
//                     <span class="type-label">${
//                       q.type === "multiple_answer"
//                         ? "Multiple Answer"
//                         : "Multiple Choice"
//                     }</span>
//                   </h3>
//                   <ul class="options">
//                     ${q.options
//                       .map(
//                         (opt) => `
//                         <li>
//                           <input type="checkbox" ${
//                             q.correctAnswers?.includes(opt) ? "checked" : ""
//                           } disabled />
//                           <label>${opt}</label>
//                         </li>`
//                       )
//                       .join("")}
//                   </ul>
//                   <div class="answer"><b>Jawaban benar:</b> ${
//                     Array.isArray(q.correctAnswers)
//                       ? q.correctAnswers.join(", ")
//                       : q.correctAnswers
//                   }</div>
//                 </div>`
//             )
//             .join("")}
//         </body>
//       </html>
//     `;

//     res.status(200).send(htmlOutput);
//   } catch (error) {
//     console.error("Error di generateQuizDemo:", error);
//     res.status(500).send("<h3>❌ Gagal membuat soal.</h3>");
//   }
// };

// src/controllers/aiController.js
// import { getTutorialContent } from "../services/tutorialService.js";
// import { generateQuizFromContent } from "../services/geminiService.js";

/**
 * 🔹 Endpoint API untuk frontend
 * POST /api/ai/generate
 * Body: { "tutorialId": 1001 }
 * Return: JSON bersih siap dikonsumsi frontend
 */

// import { generateQuizFromContent } from "../utils/generateQuizFromContent.js";

/**
 * ============================================================
 * 🎯 CONTROLLER: generateQuiz
 * ============================================================
 * Mengambil data materi dari API eksternal (Dicoding Mock API),
 * lalu mengirim konten ke Gemini AI untuk membuat soal pilihan ganda.
 * ============================================================
 */

// controllers/quizController.js
import { fetchTutorialById } from "../services/tutorialService.js";
import { generateQuizFromContent } from "../services/geminiService.js";

export const generateQuiz = async (req, res, next) => {
  try {
    const { tutorialId } = req.body;

    if (!tutorialId) {
      return res.status(400).json({
        success: false,
        message: "tutorialId is required",
      });
    }

    // Fetch tutorial from external API or local JSON
    const tutorial = await fetchTutorialById(tutorialId);

    const content = tutorial?.content || "";

    if (!content.trim()) {
      return res.status(404).json({
        success: false,
        message: "Tutorial content not found.",
      });
    }

    // Title resolver
    const extractedTitle =
      content.match(/<h2[^>]*>(.*?)<\/h2>/i)?.[1]?.trim() ||
      tutorial.title ||
      `Tutorial ${tutorialId}`;

    // Generate quiz using Gemini
    const quiz = await generateQuizFromContent(content, 5);

    if (!Array.isArray(quiz) || quiz.length === 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate quiz. AI output invalid.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quiz generated successfully.",
      tutorial: {
        id: tutorialId,
        title: extractedTitle,
      },
      meta: {
        totalQuestions: quiz.length,
        multiple_choice: quiz.filter((q) => q.type === "multiple_choice")
          .length,
        multiple_answer: quiz.filter((q) => q.type === "multiple_answer")
          .length,
      },
      quiz,
    });
  } catch (err) {
    console.error("❌ Error in generateQuiz:", err.message);
    next(err);
  }
};

// import fs from "fs";
// import path from "path";
// import { generateQuestionGemma } from "../services/gemmaService.js";

// const dataPath = path.resolve("data/tutorials.json");

// export const generateQuestion = async (req, res) => {
//   try {
//     const { id, count } = req.body;

//     if (!id) return res.status(400).json({ message: "ID tutorial wajib diisi." });

//     // 📖 Baca data tutorial
//     const rawData = fs.readFileSync(dataPath, "utf-8");
//     const tutorials = JSON.parse(rawData);

//     const tutorial = tutorials.find((item) => item.id === Number(id));

//     if (!tutorial) {
//       return res.status(404).json({ message: "Tutorial tidak ditemukan." });
//     }

//     // 🧠 Kirim konten tutorial ke AI
//     const questions = await generateQuestionGemma(tutorial.content, count || 5);

//     res.status(200).json({
//       success: true,
//       model: "Gemma 2",
//       title: tutorial.title,
//       data: questions
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
