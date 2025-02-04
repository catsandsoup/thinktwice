export type ThinkingLevel = 1 | 2 | 3 | 4;

export type ThinkingContext = {
  pathway: 'social_media' | 'decision_making' | 'argument_resolution';
  skillFocus: 'evidence_evaluation' | 'assumption_recognition' | 'logical_connections' | 'emotional_awareness';
};

export function getContextualPrompt(context: ThinkingContext, level: ThinkingLevel): string {
  const basePrompts = {
    1: "What stands out about how this argument is made?",
    2: "How does this argument try to convince you?",
    3: "What assumptions underlie this reasoning?",
    4: "How could this argument be restructured to be more logical?"
  };

  return basePrompts[level];
}

export function getReflectivePrompts(): string[] {
  return [
    "What feels familiar about this situation?",
    "Where have you encountered similar thinking patterns?",
    "How might this affect real decisions?"
  ];
}

export function getMetacognitiveSupport(context: ThinkingContext): string {
  const supports = {
    social_media: "Consider how information spreads and why people share certain content",
    decision_making: "Think about what factors influence your choices in similar situations",
    argument_resolution: "Reflect on how different perspectives might view this situation"
  };

  return supports[context.pathway];
}