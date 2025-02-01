import { StandardChallenge } from "./challengeTypes";

export const standardChallenges: StandardChallenge[] = [
  {
    id: "headline-1",
    title: "Analyzing News Headlines",
    description: "Compare these two headlines about the same climate study. Which one demonstrates more neutral, factual reporting?",
    type: "headline",
    options: [
      {
        id: "1",
        text: "Study Shows 5% Temperature Rise in Arctic Region",
        isCorrect: true,
        explanation: "This headline presents the information neutrally, focusing on the specific data point without emotional language."
      },
      {
        id: "2",
        text: "CLIMATE CATASTROPHE: Earth's Fever Spirals Out of Control!",
        isCorrect: false,
        explanation: "This headline uses sensational language and emotional manipulation rather than presenting the facts objectively."
      }
    ],
    difficulty: "beginner",
    xpReward: 10
  },
  {
    id: "fallacy-1",
    title: "Logical Fallacy Detection",
    description: "Which of these responses contains a straw man fallacy?",
    type: "fallacy",
    options: [
      {
        id: "1",
        text: "We should invest more in public transportation to reduce traffic.",
        isCorrect: false,
        explanation: "This is the original argument, stated clearly without distortion."
      },
      {
        id: "2",
        text: "So you want to force everyone to give up their cars completely?",
        isCorrect: true,
        explanation: "This is a straw man fallacy - it misrepresents the original position by exaggerating it to an extreme."
      }
    ],
    difficulty: "beginner",
    xpReward: 10
  },
  {
    id: "media-1",
    title: "Media Bias Detection",
    description: "Which statement shows the most obvious bias in its language?",
    type: "media",
    options: [
      {
        id: "1",
        text: "The city council voted 7-3 to approve the new park project.",
        isCorrect: false,
        explanation: "This is an objective statement of fact without loaded language."
      },
      {
        id: "2",
        text: "Corrupt city council rams through controversial park scheme despite public outcry.",
        isCorrect: true,
        explanation: "This uses loaded terms like 'corrupt', 'rams through', and 'scheme' to create bias."
      }
    ],
    difficulty: "beginner",
    xpReward: 10
  },
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
    id: "fallacy-2",
    title: "Identifying Ad Hominem Fallacies",
    description: "Which response demonstrates an ad hominem fallacy?",
    type: "fallacy",
    options: [
      {
        id: "1",
        text: "Your economic proposal won't work because you've never run a business.",
        isCorrect: true,
        explanation: "This is an ad hominem fallacy because it attacks the person's characteristics rather than addressing their argument."
      },
      {
        id: "2",
        text: "Your economic proposal won't work because it doesn't account for inflation.",
        isCorrect: false,
        explanation: "This is a valid criticism that addresses the substance of the argument rather than attacking the person."
      }
    ],
    difficulty: "beginner",
    xpReward: 10
  },
  {
    id: "media-2",
    title: "Statistical Manipulation",
    description: "Which presentation of statistics appears to be misleading?",
    type: "media",
    options: [
      {
        id: "1",
        text: "Sales increased from 10.1% to 10.4% this quarter",
        isCorrect: false,
        explanation: "This presents the data clearly and accurately, showing the actual percentage change."
      },
      {
        id: "2",
        text: "Sales SURGE by 300 basis points in DRAMATIC market shift!",
        isCorrect: true,
        explanation: "This uses dramatic language and presents the same 0.3% increase in a way that makes it seem much larger (300 basis points = 3%)."
      }
    ],
    difficulty: "beginner",
    xpReward: 10
  },
  {
    id: "fallacy-3",
    title: "Correlation vs. Causation",
    description: "Which statement incorrectly implies causation?",
    type: "fallacy",
    options: [
      {
        id: "1",
        text: "Ice cream sales and drowning incidents both increase in summer months.",
        isCorrect: false,
        explanation: "This statement only notes a correlation without implying that one causes the other."
      },
      {
        id: "2",
        text: "Ice cream sales are causing more drowning incidents this summer.",
        isCorrect: true,
        explanation: "This incorrectly assumes causation from correlation. Both increases are likely due to warmer weather, not a causal relationship."
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
  },
  {
    id: "media-3",
    title: "Understanding Supply Chain Impact",
    description: "A tech company CEO tweets: \"We're moving all manufacturing back to America - prices of our products won't change and quality will improve!\" Which key economic factor is being ignored in this statement?",
    type: "media",
    options: [
      {
        id: "1",
        text: "Labor costs are significantly higher in America than in current manufacturing locations",
        isCorrect: true,
        explanation: "The statement overlooks the substantial wage differences between countries and how this would impact production costs, which would likely necessitate either price increases or reduced profit margins."
      },
      {
        id: "2",
        text: "The company's stock price might change",
        isCorrect: false,
        explanation: "While stock prices might be affected, this isn't the key economic factor being ignored in the statement."
      },
      {
        id: "3",
        text: "Consumer preferences for domestic products",
        isCorrect: false,
        explanation: "Consumer preferences, while relevant, aren't the main economic factor being overlooked in this case."
      },
      {
        id: "4",
        text: "Transportation costs between countries",
        isCorrect: false,
        explanation: "While transportation costs are a factor, they're typically less significant than labor cost differences in manufacturing."
      }
    ],
    difficulty: "intermediate",
    xpReward: 15
  },
  {
    id: "media-4",
    title: "Statistical Context Analysis",
    description: "Given the headline: \"Housing Market CRASHES: Home Sales Drop 30% From Last Month!\" Which additional piece of information is MOST important for properly understanding this headline?",
    type: "media",
    options: [
      {
        id: "1",
        text: "The average sale price of homes",
        isCorrect: false,
        explanation: "While price data is useful, it doesn't directly help interpret the sales volume change."
      },
      {
        id: "2",
        text: "Typical seasonal variations in home sales",
        isCorrect: true,
        explanation: "Monthly comparisons without seasonal context can be misleading, especially in real estate where sales volumes naturally fluctuate throughout the year."
      },
      {
        id: "3",
        text: "The current interest rate",
        isCorrect: false,
        explanation: "While interest rates affect the market, they don't directly explain the month-to-month comparison issue."
      },
      {
        id: "4",
        text: "The number of new home listings",
        isCorrect: false,
        explanation: "New listings are important but don't address the potential seasonal nature of the sales drop."
      }
    ],
    difficulty: "intermediate",
    xpReward: 15
  }
];