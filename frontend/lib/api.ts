import type { QuizCreatePayload, QuizDetail, QuizListItem } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_URL;

function assertBase(): string {
    if (!BASE) throw new Error("NEXT_PUBLIC_API_URL is not set");
    return BASE;
}

export async function apiGetQuizzes(): Promise<QuizListItem[]> {
    const res = await fetch(`${assertBase()}/quizzes`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load quizzes");
    return res.json();
}

export async function apiGetQuiz(id: string): Promise<QuizDetail> {
    const res = await fetch(`${assertBase()}/quizzes/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load quiz");
    return res.json();
}

export async function apiCreateQuiz(payload: QuizCreatePayload): Promise<{ id: string }> {
    const res = await fetch(`${assertBase()}/quizzes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create quiz");
    return res.json();
}

export async function apiDeleteQuiz(id: string): Promise<void> {
    const res = await fetch(`${assertBase()}/quizzes/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete quiz");
}
