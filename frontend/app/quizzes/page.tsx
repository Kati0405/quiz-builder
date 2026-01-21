'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { QuizListItem } from '@/lib/types';
import { apiDeleteQuiz, apiGetQuizzes } from '@/lib/api';
import { mockQuizzes } from '@/lib/mock';

export default function QuizzesPage() {
  const [items, setItems] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    apiGetQuizzes()
      .then((data) => {
        setItems(data);
        setIsMock(false);
      })
      .catch(() => {
        setItems(mockQuizzes);
        setIsMock(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const onDelete = async (id: string) => {
    if (isMock) {
      setItems((prev) => prev.filter((x) => x.id !== id));
      return;
    }

    await apiDeleteQuiz(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1>Quizzes</h1>

      {isMock && (
        <p style={{ marginTop: 8, opacity: 0.7 }}>
          Showing demo data (backend not available).
        </p>
      )}

      <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
        {items.map((q) => (
          <div
            key={q.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: 12,
              padding: 14,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Link href={`/quizzes/${q.id}`} style={{ textDecoration: 'none' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{q.title}</div>
                <div style={{ opacity: 0.7 }}>{q.questionCount} questions</div>
              </div>
            </Link>

            <button
              aria-label='Delete quiz'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(q.id);
              }}
              title='Delete'
              style={{ cursor: 'pointer' }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
