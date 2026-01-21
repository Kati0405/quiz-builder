import type { QuizListItem } from "./types";
import type { QuizDetail } from "./types";

export const mockQuizzes: QuizListItem[] = [
    { id: "demo-1", title: "Birds of Ukraine (demo)", questionCount: 5 },
    { id: "demo-2", title: "Home Assistant basics (demo)", questionCount: 3 },
    { id: "demo-3", title: "JavaScript traps (demo)", questionCount: 7 },
];

export const mockQuizDetails: Record<string, QuizDetail> = {
    "demo-1": {
        id: "demo-1",
        title: "Birds of Ukraine (demo)",
        questions: [
            { id: "q1", type: "boolean", text: "Is a stork a migratory bird?" },
            {
                id: "q2",
                type: "checkbox",
                text: "Which of these are birds?",
                options: [
                    { id: "o1", text: "Sparrow" },
                    { id: "o2", text: "Bat" },
                    { id: "o3", text: "Eagle" },
                ],
            },
            { id: "q3", type: "input", text: "What bird is a symbol of peace?" },
        ],
    },

    "demo-2": {
        id: "demo-2",
        title: "Home Assistant basics (demo)",
        questions: [
            { id: "q1", type: "boolean", text: "Is Home Assistant open source?" },
            { id: "q2", type: "input", text: "What protocol is Zigbee?" },
        ],
    },
};