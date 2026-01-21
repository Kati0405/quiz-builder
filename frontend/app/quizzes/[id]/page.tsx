'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import QuizDetails from '@/components/QuizDetails';
import type { QuizDetail } from '@/lib/types';
import { apiGetQuiz } from '@/lib/api';
import { mockQuizDetails } from '@/lib/mock';

export default function QuizDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [quiz, setQuiz] = useState<QuizDetail | null>(null);
  const [isMock, setIsMock] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGetQuiz(id)
      .then((data) => {
        setQuiz(data);
        setIsMock(false);
      })
      .catch(() => {
        const mock = mockQuizDetails[id];
        if (mock) {
          setQuiz(mock);
          setIsMock(true);
        } else {
          setError('Quiz not found');
        }
      });
  }, [id]);

  if (error) {
    return <div style={{ padding: 24, color: 'crimson' }}>{error}</div>;
  }

  if (!quiz) {
    return <div style={{ padding: 24 }}>Loading…</div>;
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1>{quiz.title}</h1>

      {isMock && (
        <p style={{ marginTop: 8, opacity: 0.7 }}>
          Showing demo data (backend not available).
        </p>
      )}

      <div style={{ marginTop: 16 }}>
        <QuizDetails quiz={quiz} />
      </div>
    </div>
  );
}
