import { useEffect, useState } from "react";

import QuizHeader from "../../components/playground/quiz/QuizHeader";
import QuizQuestionView from "../../components/playground/quiz/QuizQuestionView";
import QuizResultCorrect from "../../components/playground/quiz/QuizResultCorrect";
import QuizResultWrong from "../../components/playground/quiz/QuizResultWrong";

type QuizQuestion = {
  questionId: number;
  question: string;
};

type QuizStatus = "question" | "correct" | "wrong";

type QuizAnswerResponse = {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
};

export default function Quiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  const [status, setStatus] = useState<QuizStatus>("question");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [explanation, setExplanation] = useState("");

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch("/api/games/quiz/start", {
          credentials: "include",
        });

        if (!res.ok) return;

        const data = await res.json();

        // ✅ 현재 백엔드 응답: 배열 그 자체
        //    (혹시 나중에 {questions: []}로 바뀌어도 대응)
        const list: QuizQuestion[] = Array.isArray(data) ? data : data?.questions ?? [];

        setQuestions(list);
        setCurrentIndex(0);
        setStatus("question");
      } catch {
        // 필요 시 에러 처리 확장
      }
    };

    fetchQuiz();
  }, []);

  const handleSubmitAnswer = async () => {
    if (!currentQuestion) return;

    try {
      const res = await fetch("/api/games/quiz/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          questionId: currentQuestion.questionId,
          answer: answer.trim(),
        }),
      });

      if (!res.ok) return;

      const data: QuizAnswerResponse = await res.json();

      console.log("answer raw:", JSON.stringify(answer));
      console.log("answer len:", answer.length);
      console.log("correct raw:", JSON.stringify(data.correctAnswer));
      console.log("correct len:", data.correctAnswer.length);

      setCorrectAnswer(data.correctAnswer ?? "");
      setExplanation(data.explanation ?? "");
      setStatus(data.isCorrect ? "correct" : "wrong");
    } catch {
      // 필요 시 에러 처리 확장
    }
  };

  const handleNextQuestion = () => {
    setAnswer("");
    setCorrectAnswer("");
    setExplanation("");
    setStatus("question");

    setCurrentIndex((prev) => {
      const next = prev + 1;
      return next < questions.length ? next : prev; // 범위 초과 방지
    });
  };

  // 선택: 로딩/빈 데이터 구분
  if (questions.length === 0) {
    return (
      <main className="flex-1 px-4 md:px-20 lg:px-40 py-12 flex items-center justify-center">
        <div className="text-gray-600">문제를 불러오는 중입니다.</div>
      </main>
    );
  }

  return (
    <main className="flex-1 px-4 md:px-20 lg:px-40 py-12 flex flex-col items-center">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        <QuizHeader currentIndex={currentIndex} totalCount={questions.length} />

        {status === "question" && (
          <QuizQuestionView
            question={currentQuestion?.question}
            answer={answer}
            onChangeAnswer={setAnswer}
            onSubmit={handleSubmitAnswer}
          />
        )}

        {status === "correct" && (
          <QuizResultCorrect
            correctAnswer={correctAnswer}
            explanation={explanation}
            onNext={handleNextQuestion}
          />
        )}

        {status === "wrong" && (
          <QuizResultWrong
            answer={answer}
            correctAnswer={correctAnswer}
            explanation={explanation}
            onNext={handleNextQuestion}
          />
        )}
      </div>
    </main>
  );
}
