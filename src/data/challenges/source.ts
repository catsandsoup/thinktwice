import { StandardChallenge } from "../challengeTypes";

export const sourceChallenges: StandardChallenge[] = [
  {
    id: "source-1",
    title: "Source Credibility Analysis",
    description: "Which source would be most reliable for current medical research findings?",
    type: "source",
    options: [
      {
        id: "1",
        text: "A peer-reviewed article in a medical journal",
        isCorrect: true,
        explanation: "Peer-reviewed medical journals provide the most reliable, scientifically-validated information about medical research."
      },
      {
        id: "2",
        text: "A viral social media post by a wellness influencer",
        isCorrect: false,
        explanation: "Social media influencers often lack medical credentials and may promote unverified information for engagement."
      }
    ],
    difficulty: "beginner",
    xpReward: 10
  },
  {
    id: "source-2",
    title: "Evaluating Expert Opinions",
    description: "Which expert opinion should carry more weight in a discussion about climate change?",
    type: "source",
    options: [
      {
        id: "1",
        text: "A celebrity's views shared on their popular podcast",
        isCorrect: false,
        explanation: "Celebrity status doesn't confer expertise in scientific matters. Their platform size doesn't validate their opinions on complex scientific topics."
      },
      {
        id: "2",
        text: "A published climate scientist's peer-reviewed research",
        isCorrect: true,
        explanation: "A climate scientist's peer-reviewed research represents verified expertise and has been validated by other experts in the field."
      }
    ],
    difficulty: "beginner",
    xpReward: 10
  }
];