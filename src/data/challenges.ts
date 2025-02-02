import { Challenge } from "./challengeTypes";

/**
 * This file contains all critical thinking challenges organized by difficulty level.
 * Challenges are designed to help users develop various analytical and evaluation skills
 * through interactive exercises.
 */

export const beginnerChallenges: Challenge[] = [
  {
    id: "1",
    title: "Identifying False Dilemmas",
    description: "Learn to spot false either/or choices in arguments. Which of these statements present false dilemmas?",
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
    description: "You're reading a news article. Which of these elements suggest potential media bias?",
    type: "media",
    difficulty: "beginner",
    xpReward: 10,
    options: [
      {
        id: "2a",
        text: "The headline reads 'Controversial Policy Sparks Outrage' for a local zoning change that received mixed feedback.",
        isCorrect: true,
        explanation: "Using emotionally charged words like 'outrage' for mixed reactions shows bias and can influence reader perception."
      },
      {
        id: "2b",
        text: "The article includes quotes from both supporters and critics of the policy.",
        isCorrect: false,
        explanation: "Including multiple perspectives demonstrates balanced reporting rather than bias."
      },
      {
        id: "2c",
        text: "Key statistics about the policy's economic impact are mentioned only in the final paragraph.",
        isCorrect: true,
        explanation: "Placing crucial context at the end can lead readers to form opinions before getting all the facts."
      }
    ]
  },
  {
    id: "3",
    title: "Source Credibility Check",
    description: "You're researching a health topic online. Which of these sources raise red flags about credibility?",
    type: "source",
    difficulty: "beginner",
    xpReward: 10,
    options: [
      {
        id: "3a",
        text: "A personal wellness blog making medical claims without citing any scientific studies.",
        isCorrect: true,
        explanation: "Personal blogs without scientific citations are not reliable sources for medical information."
      },
      {
        id: "3b",
        text: "A peer-reviewed study published in a medical journal.",
        isCorrect: false,
        explanation: "Peer-reviewed medical journals are highly credible sources due to their rigorous review process."
      },
      {
        id: "3c",
        text: "A health advocacy website with a .org domain that's actually funded by a pharmaceutical company.",
        isCorrect: true,
        explanation: "Domain extensions don't guarantee credibility - it's important to check funding sources and potential conflicts of interest."
      }
    ]
  }
];

export const advancedChallenges: Challenge[] = [
  {
    id: "4",
    title: "Spotting Confirmation Bias",
    description: "In these research scenarios, identify examples of confirmation bias affecting the research process.",
    type: "media",
    difficulty: "intermediate",
    xpReward: 15,
    options: [
      {
        id: "4a",
        text: "A researcher studying vaccine effectiveness only interviews parents who reported positive experiences.",
        isCorrect: true,
        explanation: "This shows confirmation bias by selectively choosing data that supports existing beliefs while ignoring potential contradicting evidence."
      },
      {
        id: "4b",
        text: "A scientist revises their hypothesis after experiments show unexpected results.",
        isCorrect: false,
        explanation: "This shows good scientific practice - being willing to update beliefs based on new evidence counters confirmation bias."
      },
      {
        id: "4c",
        text: "A climate researcher excludes studies showing natural temperature variations from their analysis.",
        isCorrect: true,
        explanation: "Cherry-picking data that supports a predetermined conclusion while ignoring contradicting evidence demonstrates confirmation bias."
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

export const generationalChallenges: Challenge[] = [
  {
    id: "9",
    title: "Critical Reading in the Digital Age",
    description: "Analyze this research summary and identify elements that require deeper investigation:",
    type: "word-selection",
    difficulty: "intermediate",
    xpReward: 15,
    passage: "A new study claims that social media use increases workplace productivity. The researchers surveyed 1,000 employees across five tech startups in Silicon Valley. They found that workers who used social media during breaks reported feeling more connected to their colleagues. The study was funded by a major social media platform and focused exclusively on companies with an average employee age under 30. Previous studies in traditional industries have shown different results, with social media use correlating to decreased productivity among diverse age groups.",
    keyWords: [
      {
        word: "funded by a major social media platform",
        explanation: "This reveals a potential conflict of interest that could influence the study's design and conclusions."
      },
      {
        word: "five tech startups in Silicon Valley",
        explanation: "This indicates a limited and specific sample that may not represent broader workplace environments."
      },
      {
        word: "Previous studies in traditional industries",
        explanation: "This contradicting evidence suggests the need for a more comprehensive analysis across different contexts."
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
];

export const allChallenges: Challenge[] = [
  ...beginnerChallenges,
  ...advancedChallenges,
  ...generationalChallenges
];
