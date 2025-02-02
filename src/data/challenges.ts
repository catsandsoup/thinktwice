import { Challenge } from "./challengeTypes";

export const beginnerChallenges: Challenge[] = [
  {
    id: "1",
    title: "Identifying False Dilemmas",
    description: "Learn to spot false either/or choices in arguments",
    type: "fallacy",
    difficulty: "beginner",
    xpReward: 10,
    options: [
      {
        id: "1a",
        text: "Either you support unlimited government surveillance, or you're helping terrorists.",
        isCorrect: true,
        explanation: "This is a false dilemma because it presents only two extreme options, ignoring many possible middle-ground positions on privacy and security."
      },
      {
        id: "1b",
        text: "The restaurant serves both chicken and beef options.",
        isCorrect: false,
        explanation: "This is a simple statement of available choices, not a false dilemma."
      },
      {
        id: "1c",
        text: "You're either with us or against us in this debate.",
        isCorrect: true,
        explanation: "This is a false dilemma because it ignores the possibility of neutral positions or partial agreement."
      }
    ]
  },
  {
    id: "2",
    title: "Media Bias Analysis",
    description: "Examine how media presentation affects perception",
    type: "media",
    difficulty: "beginner",
    xpReward: 10,
    options: [
      {
        id: "2a",
        text: "The headline uses emotionally charged words to describe a neutral event.",
        isCorrect: true,
        explanation: "Using emotional language in headlines can influence reader perception before they even read the article."
      },
      {
        id: "2b",
        text: "The article includes quotes from multiple sources.",
        isCorrect: false,
        explanation: "Including multiple sources is actually a sign of balanced reporting."
      },
      {
        id: "2c",
        text: "Important context is buried in the last paragraph.",
        isCorrect: true,
        explanation: "Placing crucial context at the end can lead readers to form opinions before getting all the facts."
      }
    ]
  },
  {
    id: "3",
    title: "Source Credibility Check",
    description: "Evaluate the reliability of information sources",
    type: "source",
    difficulty: "beginner",
    xpReward: 10,
    options: [
      {
        id: "3a",
        text: "The article is published on a personal blog with no citations.",
        isCorrect: true,
        explanation: "Personal blogs without citations are generally less reliable than peer-reviewed or professionally edited sources."
      },
      {
        id: "3b",
        text: "The study was published in a scientific journal.",
        isCorrect: false,
        explanation: "Publication in a scientific journal typically indicates higher credibility due to peer review."
      },
      {
        id: "3c",
        text: "The website uses a .org domain but is actually a lobbying group.",
        isCorrect: true,
        explanation: "Domain extensions alone don't guarantee credibility - it's important to check who's behind the website."
      }
    ]
  }
];