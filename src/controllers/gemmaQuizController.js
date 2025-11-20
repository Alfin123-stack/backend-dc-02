import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateQuestionGemma } from "../services/gemmaService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tutorials = JSON.parse(
  readFileSync(path.join(__dirname, "../data/tutorials.json"), "utf-8")
);

export const generateQuestion = async (req, res) => {
  try {
    const tutorialId = req.body.id || req.body.tutorialId;
    const count = parseInt(req.body.count) || 5;

    // Validasi input
    if (!tutorialId) {
      return res.status(400).json({
        success: false,
        message: "Tutorial ID is required",
      });
    }

    if (count < 1 || count > 20) {
      return res.status(400).json({
        success: false,
        message: "Count must be between 1 and 20",
      });
    }

    // Cari tutorial
    const tutorial = tutorials.find((t) => t.id === Number(tutorialId));

    if (!tutorial) {
      return res.status(404).json({
        success: false,
        message: "Tutorial not found",
      });
    }

    console.log(`\n🎯 Generating quiz for: "${tutorial.title}"`);
    console.log(`📝 Content length: ${tutorial.content.length} characters`);
    console.log(`🔢 Requested questions: ${count}\n`);

    // Generate questions
    const startTime = Date.now();
    const raw = await generateQuestionGemma(tutorial.content, count);
    const endTime = Date.now();

    // Parse hasil
    let jsonOutput;
    try {
      jsonOutput = JSON.parse(raw);
    } catch (err) {
      console.error("❌ Controller: AI returned invalid JSON");
      console.error("📄 Raw output sample:", raw.substring(0, 500));
      
      return res.status(500).json({
        success: false,
        message: "AI did not return valid JSON",
        error: err.message,
        rawSample: raw.substring(0, 200)
      });
    }

    // Validasi kualitas output
    const qualityCheck = validateQuizQuality(jsonOutput);
    
    if (!qualityCheck.passed) {
      console.warn("⚠️ Quality check failed:", qualityCheck.issues);
    }

    // Hitung statistik
    const stats = calculateQuizStats(jsonOutput);

    console.log(`✅ Quiz generated successfully in ${endTime - startTime}ms`);
    console.log(`📊 Stats:`, stats);

    return res.status(200).json({
      success: true,
      message: "Quiz generated successfully by Qwen2.5-7B-Instruct",
      tutorial: {
        id: tutorial.id,
        title: tutorial.title,
      },
      meta: {
        totalQuestions: jsonOutput.totalQuestions || jsonOutput.questions.length,
        generationTime: `${endTime - startTime}ms`,
        typeSummary: {
          multiple_choice: jsonOutput.questions.filter(
            (q) => q.type === "multiple_choice"
          ).length,
          multiple_answer: jsonOutput.questions.filter(
            (q) => q.type === "multiple_answer"
          ).length,
        },
        qualityMetrics: stats,
        qualityCheck: qualityCheck
      },
      quiz: jsonOutput.questions,
    });

  } catch (error) {
    console.error("❌ Controller Error:", error.message);
    console.error(error.stack);
    
    return res.status(500).json({
      success: false,
      message: "Failed to generate quiz",
      error: error.message
    });
  }
};

// Validasi kualitas quiz
const validateQuizQuality = (quiz) => {
  const issues = [];
  
  quiz.questions.forEach((q, idx) => {
    // Cek feedback kosong
    const emptyFeedbacks = Object.values(q.options).filter(
      opt => !opt.feedback || opt.feedback.length < 10
    ).length;
    
    if (emptyFeedbacks > 0) {
      issues.push(`Question ${idx + 1}: ${emptyFeedbacks} options have insufficient feedback`);
    }

    // Cek explanation
    if (!q.explanation || q.explanation.length < 20) {
      issues.push(`Question ${idx + 1}: Explanation too short or missing`);
    }

    // Cek pertanyaan
    if (q.question.length < 20) {
      issues.push(`Question ${idx + 1}: Question text too short`);
    }
  });

  return {
    passed: issues.length === 0,
    issues: issues,
    score: Math.max(0, 100 - (issues.length * 10))
  };
};

// Hitung statistik quiz
const calculateQuizStats = (quiz) => {
  let totalFeedbackLength = 0;
  let totalExplanationLength = 0;
  let totalQuestionLength = 0;

  quiz.questions.forEach(q => {
    totalQuestionLength += q.question.length;
    totalExplanationLength += (q.explanation || "").length;
    
    Object.values(q.options).forEach(opt => {
      totalFeedbackLength += (opt.feedback || "").length;
    });
  });

  const numQuestions = quiz.questions.length;
  const numOptions = numQuestions * 4;

  return {
    avgQuestionLength: Math.round(totalQuestionLength / numQuestions),
    avgExplanationLength: Math.round(totalExplanationLength / numQuestions),
    avgFeedbackLength: Math.round(totalFeedbackLength / numOptions),
    totalOptionsWithFeedback: quiz.questions.reduce((sum, q) => 
      sum + Object.values(q.options).filter(opt => opt.feedback).length
    , 0)
  };
};