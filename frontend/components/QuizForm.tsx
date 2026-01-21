'use client';

import { QuizCreateFormValues } from '@/lib/schemas';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { quizCreateSchema } from '@/lib/schemas';
import { useFieldArray, useForm } from 'react-hook-form';
import { apiCreateQuiz } from '@/lib/api';
import QuestionEditor from './QuestionEditor';

export default function QuizForm() {
  const router = useRouter();

  const form = useForm<QuizCreateFormValues>({
    resolver: zodResolver(quizCreateSchema),
    defaultValues: {
      title: '',
      questions: [{ type: 'boolean', text: '', correctBoolean: true }],
    },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions',
  });

  const addQuestion = (
    type: QuizCreateFormValues['questions'][number]['type']
  ) => {
    if (type === 'boolean')
      append({ type: 'boolean', text: '', correctBoolean: true });
    if (type === 'input') append({ type: 'input', text: '', correctText: '' });
    if (type === 'checkbox')
      append({
        type: 'checkbox',
        text: '',
        options: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
        ],
      });
  };

  const onSubmit = async (values: QuizCreateFormValues) => {
    const created = await apiCreateQuiz(values);
    router.push(`/quizzes/${created.id}`);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}
    >
      <h1>Create Quiz</h1>
      <div style={{ marginTop: 16 }}>
        <label>
          Title
          <input
            {...register('title')}
            style={{ display: 'block', width: '100%', marginTop: 6 }}
          />
        </label>

        {errors.title && (
          <p style={{ color: 'crimson' }}>{errors.title.message}</p>
        )}
      </div>
      <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type='button' onClick={() => addQuestion('boolean')}>
          + Boolean
        </button>
        <button type='button' onClick={() => addQuestion('input')}>
          + Input
        </button>
        <button type='button' onClick={() => addQuestion('checkbox')}>
          + Checkbox
        </button>
      </div>

      {errors.questions && typeof errors.questions.message === 'string' && (
        <p style={{ color: 'crimson' }}>{errors.questions.message}</p>
      )}

      <div style={{ marginTop: 24, display: 'grid', gap: 16 }}>
        {fields.map((field, idx) => (
          <div
            key={field.id}
            style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16 }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <strong>Question #{idx + 1}</strong>
              <button type='button' onClick={() => remove(idx)}>
                Remove
              </button>
            </div>

            <QuestionEditor form={form} index={idx} />
            {errors.questions?.[idx]?.text && (
              <p style={{ color: 'crimson' }}>
                {errors.questions[idx]?.text?.message as string}
              </p>
            )}
          </div>
        ))}
      </div>
      <button type='submit' disabled={isSubmitting} style={{ marginTop: 24 }}>
        {isSubmitting ? 'Saving...' : 'Create quiz'}
      </button>
    </form>
  );
}
