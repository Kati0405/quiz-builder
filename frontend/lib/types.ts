export type QuestionType = "boolean" | "input" | "checkbox";

export type QuizCreatePayload = {
  title: string;
  questions: Array<
    | {
        type: "boolean";
        text: string;
        correctBoolean: boolean;
      }
    | {
        type: "input";
        text: string;
        correctText: string;
      }
    | {
        type: "checkbox";
        text: string;
        options: { text: string; isCorrect: boolean }[];
      }
  >;
};

export type QuizListItem = {
  id: string;
  title: string;
  questionCount: number;
};

export type QuizDetail = {
  id: string;
  title: string;
  questions: Array<
    | { id: string; type: "boolean"; text: string }
    | { id: string; type: "input"; text: string }
    | {
        id: string;
        type: "checkbox";
        text: string;
        options: { id: string; text: string }[];
      }
  >;
};
