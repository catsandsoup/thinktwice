import { StandardChallenge } from "../challengeTypes";

export const mediaChallenges: StandardChallenge[] = [
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