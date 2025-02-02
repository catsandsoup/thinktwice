import { Challenge } from "./challengeTypes";

export const beginnerChallenges: Challenge[] = [
  {
    id: "1",
    title: "Spot the False Choice",
    description: "In social media debates, false dilemmas often oversimplify complex issues. Can you identify which statements present unrealistic either/or choices?",
    type: "fallacy",
    difficulty: "beginner",
    xpReward: 10,
    options: [
      {
        id: "1a",
        text: "A viral TikTok claims: 'Either you support banning all social media for teens, or you don't care about mental health.'",
        isCorrect: true,
        explanation: "This is a false dilemma because it ignores numerous balanced approaches like education, time limits, and content filtering that could address mental health concerns while allowing social media use."
      },
      {
        id: "1b",
        text: "A streaming service offers both ad-supported and ad-free subscription options.",
        isCorrect: false,
        explanation: "This presents genuine, distinct choices without forcing a false dichotomy. Users can choose based on their preferences and budget."
      },
      {
        id: "1c",
        text: "An Instagram influencer posts: 'You either follow the latest fashion trends or you'll never fit in.'",
        isCorrect: true,
        explanation: "This creates a false dilemma by suggesting social acceptance depends entirely on following trends, ignoring personal style, authenticity, and diverse social groups."
      }
    ]
  },
  {
    id: "2",
    title: "Evaluating Health Information Online",
    description: "You're researching workout supplements on social media. Which sources raise red flags about credibility?",
    type: "source",
    difficulty: "beginner",
    xpReward: 10,
    options: [
      {
        id: "3a",
        text: "A fitness influencer claims their supplement 'burns fat while you sleep' and has 'zero side effects' but doesn't link to any research.",
        isCorrect: true,
        explanation: "Claims that sound too good to be true usually are. Scientific claims require evidence, and 'zero side effects' is a red flag for any supplement."
      },
      {
        id: "3b",
        text: "A sports nutrition researcher's blog post discusses supplement effectiveness with links to published studies and explains limitations.",
        isCorrect: false,
        explanation: "This source demonstrates credibility by providing evidence, acknowledging limitations, and maintaining professional expertise."
      },
      {
        id: "3c",
        text: "A supplement company's website uses scientific terms and has a .org domain, but investigation shows it's owned by the product manufacturer.",
        isCorrect: true,
        explanation: "This is misleading marketing. The .org domain and scientific language create a false impression of independence when it's actually promotional content."
      }
    ]
  }
];

export const advancedChallenges: Challenge[] = [
  {
    id: "4",
    title: "Systems Thinking in Environmental Issues",
    type: "matching",
    description: "Connect environmental changes with their systemic impacts",
    difficulty: "advanced",
    xpReward: 20,
    pairs: [
      {
        id: "5a",
        claim: "Declining bee populations in agricultural areas",
        evidence: "Reduced crop yields in nearby farms, higher food prices, and changes in local plant biodiversity"
      },
      {
        id: "5b",
        claim: "Urban heat island effect in cities",
        evidence: "Increased energy consumption, higher healthcare costs from heat-related illness, and changes in local precipitation patterns"
      },
      {
        id: "5c",
        claim: "Overuse of antibiotics in livestock",
        evidence: "Evolution of antibiotic-resistant bacteria, changes in soil microbiome, and impacts on human health treatments"
      }
    ]
  },
  {
    id: "5",
    title: "Metacognition in Problem-Solving",
    type: "word-selection",
    description: "Select the phrases that demonstrate key metacognitive strategies - moments where the author shows awareness and reflection about their own thinking process.",
    difficulty: "intermediate",
    xpReward: 15,
    passage: "When faced with the challenge of reducing plastic waste in our community, my first instinct was to immediately propose a strict ban. However, after stepping back and examining my thought process, I realized I needed to consider multiple stakeholder perspectives, research existing solutions, and understand the economic impacts. This reflection led me to develop a more nuanced, phased approach that considered both environmental and economic factors.",
    keyWords: [
      {
        word: "first instinct",
        explanation: "This shows awareness of initial reactions, demonstrating the author's ability to recognize their immediate thought patterns"
      },
      {
        word: "stepping back and examining my thought process",
        explanation: "This phrase explicitly shows metacognition - the author is consciously analyzing how they're thinking about the problem"
      },
      {
        word: "realized I needed to consider",
        explanation: "This indicates a moment of insight where the author recognizes gaps in their initial thinking approach"
      }
    ]
  },
  {
    id: "6",
    title: "Identifying Strawman Arguments",
    type: "highlight",
    description: "Learn to spot when someone misrepresents an opponent's position",
    difficulty: "advanced",
    xpReward: 20,
    statement: "Those who support stricter building codes claim we should tear down every old building in the city. They don't care about historical preservation or the cost to property owners. Their extreme position would destroy our city's character and bankrupt local businesses.",
    highlights: [
      {
        text: "tear down every old building",
        explanation: "This exaggerates and misrepresents the actual position of building code advocates, who typically support gradual updates and reasonable accommodation for historical structures"
      },
      {
        text: "don't care about historical preservation",
        explanation: "This falsely attributes an extreme position, ignoring that many building code supporters actively work to balance safety with preservation"
      },
      {
        text: "extreme position",
        explanation: "This loaded language reinforces the strawman by characterizing the opposing view as unreasonable without addressing their actual arguments"
      }
    ]
  }
];

export const modernChallenges: Challenge[] = [
  {
    id: "7",
    title: "Financial Market Pattern Recognition",
    type: "highlight",
    description: "Identify potential red flags in investment trends and marketing. Look for common manipulation tactics used in financial promotions.",
    difficulty: "advanced",
    xpReward: 20,
    statement: "🚀 Don't miss out on MoonCoin! 📈 Already up 500% this week! Celebrity influencers are calling it the next Bitcoin. Our unique blockchain technology is revolutionizing the industry. Limited time offer - early investors get special access to our exclusive community. Join the movement before it's too late! #tothemoon #crypto #financialfreedom",
    highlights: [
      {
        text: "up 500% this week",
        explanation: "Extreme short-term gains often indicate unsustainable speculation rather than fundamental value"
      },
      {
        text: "Celebrity influencers",
        explanation: "Celebrity endorsements in financial products often involve undisclosed compensation and lack genuine expertise"
      },
      {
        text: "Limited time offer",
        explanation: "Creating artificial urgency is a common tactic to pressure people into making hasty decisions without proper research"
      }
    ]
  },
  {
    id: "8",
    title: "Multi-Factor Analysis in Current Events",
    type: "matching",
    description: "Connect surface-level observations with deeper systemic factors in today's most pressing issues. Consider how multiple factors interact to create complex situations.",
    difficulty: "advanced",
    xpReward: 20,
    pairs: [
      {
        id: "16a",
        claim: "Rising housing costs in major cities",
        evidence: "Intersection of zoning laws, remote work migration, investment properties, interest rates, and construction costs"
      },
      {
        id: "16b",
        claim: "Growing mental health concerns among young adults",
        evidence: "Combined effects of social media usage, economic pressure, changing work culture, reduced community connections, and healthcare access"
      },
      {
        id: "16c",
        claim: "Shifts in retail shopping patterns",
        evidence: "Interplay between e-commerce technology, pandemic behavior changes, supply chain restructuring, and changing consumer values"
      }
    ]
  }
];

// Helper function to remove duplicates based on challenge ID
const removeDuplicates = (challenges: Challenge[]): Challenge[] => {
  const seen = new Set<string>();
  return challenges.filter(challenge => {
    if (seen.has(challenge.id)) {
      console.warn(`Duplicate challenge ID found: ${challenge.id}`);
      return false;
    }
    seen.add(challenge.id);
    return true;
  });
};

export const allChallenges: Challenge[] = removeDuplicates([
  ...beginnerChallenges,
  ...advancedChallenges,
  ...modernChallenges
]);