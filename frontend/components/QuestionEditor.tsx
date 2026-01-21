'use client';

import type { UseFormReturn } from 'react-hook-form';
import type { QuizCreateFormValues } from '@/lib/schemas';
import { useFieldArray } from 'react-hook-form';

export default function QuestionEditor({
  form,
  index,
}: {
  form: UseFormReturn<QuizCreateFormValues>;
  index: number;
}) {
  const q = form.watch(`questions.${index}`);
  const errors = form.formState.errors;

  return (
    <div style={{ marginTop: 12 }}>
      <label>
        Question text
        <input
          {...form.register(`questions.${index}.text` as const)}
          style={{ display: 'block', width: '100%', marginTop: 6 }}
        />
      </label>

      <div style={{ marginTop: 12 }}>
        <em>Type: {q.type}</em>
      </div>

      {q.type === 'boolean' && (
        <div style={{ marginTop: 12 }}>
          <label style={{ marginRight: 12 }}>
            <input
              type='radio'
              value='true'
              checked={q.correctBoolean === true}
              onChange={() =>
                form.setValue(`questions.${index}.correctBoolean`, true)
              }
            />
            True
          </label>
          <label>
            <input
              type='radio'
              value='false'
              checked={q.correctBoolean === false}
              onChange={() =>
                form.setValue(`questions.${index}.correctBoolean`, false)
              }
            />
            False
          </label>
        </div>
      )}

      {q.type === 'input' && (
        <div style={{ marginTop: 12 }}>
          <label>
            Correct answer
            <input
              {...form.register(`questions.${index}.correctText` as const)}
              style={{ display: 'block', width: '100%', marginTop: 6 }}
            />
          </label>
          {errors.questions?.[index] &&
            (errors.questions[index] as { correctText?: { message?: string } })
              ?.correctText && (
              <p style={{ color: 'crimson' }}>
                {
                  (
                    errors.questions[index] as {
                      correctText?: { message?: string };
                    }
                  )?.correctText?.message
                }
              </p>
            )}
        </div>
      )}

      {q.type === 'checkbox' && <CheckboxOptions form={form} index={index} />}
    </div>
  );
}

function CheckboxOptions({
  form,
  index,
}: {
  form: UseFormReturn<QuizCreateFormValues>;
  index: number;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `questions.${index}.options` as const,
  });

  const optionsErr = (
    form.formState.errors.questions?.[index] as {
      options?: { message?: string };
    }
  )?.options;

  return (
    <div style={{ marginTop: 12 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <strong>Options</strong>
        <button
          type='button'
          onClick={() => append({ text: '', isCorrect: false })}
        >
          + option
        </button>
      </div>

      {typeof optionsErr?.message === 'string' && (
        <p style={{ color: 'crimson' }}>{optionsErr.message}</p>
      )}

      <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
        {fields.map((f, optIdx) => (
          <div
            key={f.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '24px 1fr auto',
              gap: 10,
            }}
          >
            <input
              type='checkbox'
              {...form.register(
                `questions.${index}.options.${optIdx}.isCorrect` as const
              )}
            />
            <input
              placeholder={`Option ${optIdx + 1}`}
              {...form.register(
                `questions.${index}.options.${optIdx}.text` as const
              )}
            />
            <button type='button' onClick={() => remove(optIdx)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
