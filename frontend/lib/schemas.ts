import { z } from "zod";

const checkboxOptionSchema = z.object({
    text: z.string().min(1, "Option text is required"),
    isCorrect: z.boolean(),
});

const booleanQSchema = z.object({
    type: z.literal("boolean"),
    text: z.string().min(1, "Question text is required"),
    correctBoolean: z.boolean(),
});

const inputQSchema = z.object({
    type: z.literal("input"),
    text: z.string().min(1, "Question text is required"),
    correctText: z.string().min(1, "Correct answer is required"),
});

const checkboxQSchema = z.object({
    type: z.literal("checkbox"),
    text: z.string().min(1, "Question text is required"),
    options: z
        .array(
            z.object({
                text: z.string().min(1, "Option text is required"),
                isCorrect: z.boolean(),
            })
        )
        .min(2, "Add at least 2 options"),
}).superRefine((val, ctx) => {
    if (!val.options.some(o => o.isCorrect)) {
        ctx.addIssue({
            code: "custom",
            message: "Select at least one correct option",
            path: ["options"],
        });
    }
});

export const quizCreateSchema = z.object({
    title: z.string().min(1, "Title is required"),
    questions: z.array(z.discriminatedUnion("type", [booleanQSchema, inputQSchema, checkboxQSchema]))
        .min(1, "Add at least one question"),
});

export type QuizCreateFormValues = z.infer<typeof quizCreateSchema>;
