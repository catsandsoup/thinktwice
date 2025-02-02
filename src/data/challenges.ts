import { Challenge } from "./challengeTypes";

/**
 * This file contains all critical thinking challenges organized by difficulty level.
 * Challenges are designed to help users develop various analytical and evaluation skills
 * through interactive exercises.
 * 
 * Challenge Types:
 * - fallacy: Identifying logical fallacies and reasoning errors
 * - media: Analyzing media presentation and bias
 * - source: Evaluating source credibility
 * - word-selection: Identifying key elements in text
 * - matching: Connecting related concepts
 * - highlight: Analyzing specific textual elements
 */

/**
 * Fundamental critical thinking exercises suitable for newcomers.
 * These challenges focus on basic concept recognition and simple analysis.
 */
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

/**
 * Intermediate and advanced challenges that build upon basic critical thinking skills.
 * These challenges focus on deeper analysis and complex reasoning patterns.
 */
export const advancedChallenges: Challenge[] = [
  {
    id: "4",
    title: "Confirmation Bias in Research",
    description: "Identify how confirmation bias can influence research and decision-making",
    type: "media",
    difficulty: "intermediate",
    xpReward: 15,
    options: [
      {
        id: "4a",
        text: "A researcher only interviews people who already agree with their hypothesis about vaccine effectiveness.",
        isCorrect: true,
        explanation: "This demonstrates confirmation bias because the researcher is selectively choosing data that supports their existing beliefs while ignoring potential contradicting evidence."
      },
      {
        id: "4b",
        text: "A scientist changes their hypothesis after finding contradictory evidence in their experiments.",
        isCorrect: false,
        explanation: "This actually shows good scientific practice - being willing to update beliefs based on new evidence is the opposite of confirmation bias."
      },
      {
        id: "4c",
        text: "A climate change researcher focuses only on studies that show temperature increases while dismissing those showing natural variation.",
        isCorrect: true,
        explanation: "This shows confirmation bias by cherry-picking data that supports a predetermined conclusion rather than considering all available evidence."
      }
    ]
  },
  {
    id: "5",
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
    id: "6",
    title: "Metacognition in Problem-Solving",
    type: "word-selection",
    description: "Analyze your own thinking process when approaching complex problems",
    difficulty: "intermediate",
    xpReward: 15,
    passage: "When faced with the challenge of reducing plastic waste in our community, my first instinct was to immediately propose a strict ban. However, after stepping back and examining my thought process, I realized I needed to consider multiple stakeholder perspectives, research existing solutions, and understand the economic impacts. This reflection led me to develop a more nuanced, phased approach that considered both environmental and economic factors.",
    keyWords: [
      {
        word: "first instinct",
        explanation: "Recognizing our initial reactions helps us understand potential biases and emotional responses"
      },
      {
        word: "stepping back",
        explanation: "Taking time to pause and reflect is a key metacognitive strategy that improves decision-making"
      },
      {
        word: "multiple stakeholder perspectives",
        explanation: "Acknowledging different viewpoints demonstrates intellectual humility and systems thinking"
      }
    ]
  },
  {
    id: "7",
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
  },
  {
    id: "8",
    title: "Source Evaluation in the Digital Age",
    type: "source",
    description: "Evaluate the credibility of online information sources",
    difficulty: "intermediate",
    xpReward: 15,
    options: [
      {
        id: "8a",
        text: "A viral social media post claims a medical breakthrough, but the linked website was created last week and has no institutional affiliation.",
        isCorrect: true,
        explanation: "Recent website creation and lack of institutional backing are red flags for potential misinformation, especially regarding medical claims."
      },
      {
        id: "8b",
        text: "A news article cites peer-reviewed studies and includes interviews with experts who disagree about the interpretation of the results.",
        isCorrect: false,
        explanation: "This actually demonstrates good journalistic practice by showing multiple expert perspectives and citing credible research."
      },
      {
        id: "8c",
        text: "An article uses technical jargon and complex graphs but doesn't link to any original data sources.",
        isCorrect: true,
        explanation: "Technical presentation without verifiable sources can be a way to make questionable information appear more credible."
      }
    ]
  }
];

/**
 * Advanced challenges focused on modern information processing and digital literacy.
 * These challenges address contemporary issues in information consumption and analysis.
 */
export const generationalChallenges: Challenge[] = [
  {
    id: "9",
    title: "Deep Reading vs. Skimming",
    type: "word-selection",
    description: "Practice identifying key elements that require deeper analysis versus surface-level reading",
    difficulty: "intermediate",
    xpReward: 15,
    passage: "A new study claims that social media use increases productivity in the workplace. The researchers surveyed 1,000 employees across five tech startups in Silicon Valley. They found that workers who used social media during breaks reported feeling more connected to their colleagues. The study was funded by a major social media platform and focused exclusively on companies with an average employee age under 30. Previous studies in traditional industries have shown different results, with social media use correlating to decreased productivity among diverse age groups.",
    keyWords: [
      {
        word: "funded by a major social media platform",
        explanation: "Potential conflict of interest that requires deeper investigation into possible bias in study design and conclusions"
      },
      {
        word: "five tech startups in Silicon Valley",
        explanation: "Limited sample size and specific industry context that may not generalize to other workplace environments"
      },
      {
        word: "Previous studies in traditional industries",
        explanation: "Contradicting evidence that suggests the need for more comprehensive analysis of the topic"
      }
    ]
  },
  {
    id: "10",
    title: "Beyond Headlines and Viral Content",
    type: "matching",
    description: "Connect viral headlines with their more nuanced underlying stories",
    difficulty: "advanced",
    xpReward: 20,
    pairs: [
      {
        id: "10a",
        claim: "BREAKING: New Diet Pill Melts Fat Overnight!",
        evidence: "Small-scale preliminary study shows modest weight loss effects over 6 months with specific dietary restrictions and exercise requirements"
      },
      {
        id: "10b",
        claim: "Tech CEO: 'AI Will Replace All Jobs by 2025!'",
        evidence: "Industry expert discusses potential automation of certain tasks while emphasizing the creation of new roles and the increasing importance of human skills"
      },
      {
        id: "10c",
        claim: "Scientists Find Miracle Cure in Common Household Item!",
        evidence: "Laboratory study identifies potentially beneficial compound requiring years of clinical trials before possible medical applications"
      }
    ]
  },
  {
    id: "11",
    title: "Algorithm Awareness",
    type: "highlight",
    description: "Understand how content recommendation systems shape information exposure",
    difficulty: "advanced",
    xpReward: 20,
    statement: "My social media feed keeps showing articles about how vitamins cure everything. I've noticed more health influencers appearing in my recommendations since I watched one video about nutrition. Now my friends are sharing similar content, so it must be becoming more popular and credible. The algorithms know what's trending and important, right?",
    highlights: [
      {
        text: "keeps showing articles",
        explanation: "Content reinforcement through algorithmic recommendations can create a false sense of consensus or prominence"
      },
      {
        text: "since I watched one video",
        explanation: "Demonstration of how recommendation systems can amplify initial interests into echo chambers"
      },
      {
        text: "my friends are sharing similar content",
        explanation: "Social proof bias combined with algorithmic filtering can create an illusion of widespread agreement"
      }
    ]
  },
  {
    id: "12",
    title: "Attention Span and Complex Analysis",
    type: "media",
    description: "Evaluate how different content formats affect understanding of complex topics",
    difficulty: "intermediate",
    xpReward: 15,
    options: [
      {
        id: "12a",
        text: "A 30-second video claims to explain quantum physics with fun animations and oversimplified analogies.",
        isCorrect: true,
        explanation: "Complex topics often require longer-form content and deeper engagement to understand nuances and avoid misconceptions."
      },
      {
        id: "12b",
        text: "A long-form article breaks down a scientific concept with detailed explanations and relevant examples.",
        isCorrect: false,
        explanation: "This format allows for proper depth and nuance in explaining complex topics, even though it requires more attention and effort."
      },
      {
        id: "12c",
        text: "A series of memes summarizes a political debate using witty one-liners and popular references.",
        isCorrect: true,
        explanation: "While engaging, this format often oversimplifies complex issues and may promote shallow understanding of important topics."
      }
    ]
  },
  {
    id: "13",
    title: "Information Overwhelm and Decision Making",
    type: "source",
    description: "Learn to manage and evaluate information when faced with overwhelming options",
    difficulty: "advanced",
    xpReward: 20,
    options: [
      {
        id: "13a",
        text: "Making a healthcare decision by following the most-liked comments on a medical support group.",
        isCorrect: true,
        explanation: "Social validation shouldn't replace careful evaluation of credible medical sources and professional advice."
      },
      {
        id: "13b",
        text: "Researching a topic using academic databases and fact-checking websites, taking notes to compare findings.",
        isCorrect: false,
        explanation: "This methodical approach helps manage information overload while maintaining quality of research."
      },
      {
        id: "13c",
        text: "Choosing a political stance based on which influencers have the most engaging content about the issue.",
        isCorrect: true,
        explanation: "Entertainment value and social media engagement metrics aren't reliable indicators of argument quality or factual accuracy."
      }
    ]
  },
