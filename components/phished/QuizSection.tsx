'use client';

import { useState } from 'react';
import { Check, X, Trophy } from 'lucide-react';
import type { QuizQuestion } from '@/types/scenario';

interface Props {
  questions: QuizQuestion[];
}

interface AnswerState {
  picked: 'a' | 'b' | 'c';
  correct: boolean;
}

export function QuizSection({ questions }: Props) {
  const [answers, setAnswers] = useState<Record<number, AnswerState>>({});
  const [floaters, setFloaters] = useState<Array<{ id: number; text: string }>>([]);

  const allAnswered = questions.length > 0 && Object.keys(answers).length === questions.length;
  const score = Object.values(answers).filter((a) => a.correct).length * 50;
  const maxScore = questions.length * 50;

  const handlePick = (qIdx: number, pick: 'a' | 'b' | 'c') => {
    if (answers[qIdx]) return;
    const correct = questions[qIdx].correct === pick;
    setAnswers((prev) => ({ ...prev, [qIdx]: { picked: pick, correct } }));

    if (correct) {
      const id = Date.now() + qIdx;
      setFloaters((prev) => [...prev, { id, text: '+50 pkt' }]);
      setTimeout(() => setFloaters((prev) => prev.filter((f) => f.id !== id)), 1400);
    }
  };

  if (questions.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[color:var(--color-text)]">
            Quiz: czy zrozumiałeś dlaczego to phishing?
          </h2>
          <p className="text-xs text-[color:var(--color-muted)] mt-0.5">
            3 pytania, każde +50 pkt. Wybierz najlepszą odpowiedź.
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[color:var(--color-accent)]">
            {score} / {maxScore}
          </div>
          <div className="text-xs text-[color:var(--color-muted)]">punkty</div>
        </div>
      </div>

      <div className="space-y-5">
        {questions.map((q, qIdx) => {
          const answer = answers[qIdx];
          const options: Array<{ key: 'a' | 'b' | 'c'; text: string }> = [
            { key: 'a', text: q.a },
            { key: 'b', text: q.b },
            { key: 'c', text: q.c },
          ];

          return (
            <article
              key={qIdx}
              className="p-5 rounded-lg bg-[color:var(--color-surface)] border border-[color:var(--color-border)] space-y-3"
            >
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)] text-sm font-bold flex items-center justify-center">
                  {qIdx + 1}
                </span>
                <p className="font-medium text-[color:var(--color-text)] leading-relaxed">{q.question}</p>
              </div>

              <div className="space-y-2 ml-10">
                {options.map((opt) => {
                  const picked = answer?.picked === opt.key;
                  const isCorrect = q.correct === opt.key;
                  const showCorrect = answer && isCorrect;
                  const showWrong = answer && picked && !isCorrect;
                  const disabled = !!answer;

                  let optionClass = 'border border-[color:var(--color-border)] hover:border-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)]/5';
                  if (showCorrect) optionClass = 'border-[color:var(--color-success)] bg-[color:var(--color-success)]/10 text-[color:var(--color-text)]';
                  else if (showWrong) optionClass = 'border-[color:var(--color-danger)] bg-[color:var(--color-danger)]/10 text-[color:var(--color-text)]';
                  else if (answer) optionClass = 'border border-[color:var(--color-border)] opacity-50';

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handlePick(qIdx, opt.key)}
                      disabled={disabled}
                      className={`w-full text-left px-4 py-3 rounded-md transition-all text-sm flex items-center gap-3 ${optionClass} ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <span className="shrink-0 w-6 h-6 rounded-full border border-current text-xs font-bold flex items-center justify-center uppercase">
                        {opt.key}
                      </span>
                      <span className="flex-1">{opt.text}</span>
                      {showCorrect && <Check className="w-4 h-4 text-[color:var(--color-success)]" />}
                      {showWrong && <X className="w-4 h-4 text-[color:var(--color-danger)]" />}
                    </button>
                  );
                })}
              </div>

              {answer && (
                <div className="ml-10 mt-2 text-xs text-[color:var(--color-muted)]">
                  {answer.correct
                    ? '✓ Dobrze! Zauważyłeś kluczowy wskaźnik.'
                    : `✗ Poprawna odpowiedź: ${q.correct.toUpperCase()}. Przemyśl wskaźniki powyżej.`}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {allAnswered && (
        <div className="p-5 rounded-lg bg-gradient-to-r from-[color:var(--color-accent)]/15 to-[color:var(--color-accent)]/5 border border-[color:var(--color-accent)] flex items-center gap-4">
          <Trophy className="w-10 h-10 text-[color:var(--color-accent)] shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-[color:var(--color-text)]">
              Twój wynik: {score} / {maxScore}
              {score === maxScore && ' — Phish Spotter Master 🎯'}
            </p>
            <p className="text-xs text-[color:var(--color-muted)] mt-0.5">
              {score === maxScore
                ? 'Komplet — gratulacje. Dział IT widzi twój wynik na dashboardzie w czasie rzeczywistym.'
                : score >= maxScore * 0.66
                ? 'Dobry wynik. Kilka wskaźników jeszcze warto przyswoić.'
                : 'Polecamy powtórzyć lekcję — wskaźniki phishingu warto znać na pamięć.'}
            </p>
          </div>
        </div>
      )}

      {/* Floating +50 pkt animations */}
      <div className="fixed top-20 right-8 pointer-events-none z-50 space-y-1">
        {floaters.map((f) => (
          <div
            key={f.id}
            className="score-floater bg-[color:var(--color-accent)] text-[color:var(--color-bg)] font-bold text-sm px-3 py-1.5 rounded shadow-lg"
          >
            {f.text}
          </div>
        ))}
      </div>
    </section>
  );
}
