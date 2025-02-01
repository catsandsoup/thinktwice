export type ChallengeType = "headline" | "fallacy" | "media" | "source" | "word-selection" | "matching" | "highlight";

export type BaseChallenge = {
  title: string;
  description: string;
  type: ChallengeType;
  difficulty: "beginner" | "intermediate" | "advanced";
  xpReward: number;
};

export type StandardChallenge = BaseChallenge & {
  type: "headline" | "fallacy" | "media" | "source";
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
};

export type WordSelectionChallenge = BaseChallenge & {
  type: "word-selection";
  passage: string;
  keyWords: {
    word: string;
    explanation: string;
  }[];
};

export type MatchingChallenge = BaseChallenge & {
  type: "matching";
  pairs: {
    claim: string;
    evidence: string;
    id: string;
  }[];
};

export type HighlightChallenge = BaseChallenge & {
  type: "highlight";
  statement: string;
  highlights: {
    text: string;
    explanation: string;
  }[];
};

export type Challenge = StandardChallenge | WordSelectionChallenge | MatchingChallenge | HighlightChallenge;