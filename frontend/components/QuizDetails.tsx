import type { QuizDetail } from '@/lib/types';

export default function QuizDetails({ quiz }: { quiz: QuizDetail }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {quiz.questions.map((q, i) => (
        <div
          key={q.id}
          style={{ border: '1px solid #ddd', borderRadius: 12, padding: 14 }}
        >
          <strong>Q{i + 1}.</strong> {q.text}
          <div style={{ opacity: 0.7, marginTop: 6 }}>Type: {q.type}</div>
          {q.type === 'checkbox' && (
            <ul style={{ marginTop: 10 }}>
              {q.options.map((o) => (
                <li key={o.id}>{o.text}</li>
              ))}
            </ul>
          )}
          {q.type === 'boolean' && (
            <div style={{ marginTop: 10, opacity: 0.8 }}>True / False</div>
          )}
          {q.type === 'input' && (
            <div style={{ marginTop: 10, opacity: 0.8 }}>Short text answer</div>
          )}
        </div>
      ))}
    </div>
  );
}
