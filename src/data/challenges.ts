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
    title: "Decoding Social Media Influence",
    description: "You're scrolling through your feed and see a trending post about a new health supplement. Which elements suggest potential bias or manipulation?",
    type: "media",
    difficulty: "beginner",
    xpReward: 10,
    options: [
      {
        id: "2a",
        text: "The post shows before and after photos with dramatic lighting differences and claims 'EVERYONE is talking about this miracle supplement!'",
        isCorrect: true,
        explanation: "The use of manipulated photos and vague, exaggerated claims ('EVERYONE') are classic signs of marketing manipulation rather than honest product information."
      },
      {
        id: "2b",
        text: "The post includes a detailed ingredients list, links to peer-reviewed studies, and mentions both benefits and potential side effects.",
        isCorrect: false,
        explanation: "This demonstrates transparency and balanced reporting by providing verifiable information and acknowledging limitations."
      },
      {
        id: "2c",
        text: "The influencer mentions their 'honest review' but doesn't disclose they're being paid to promote the product.",
        isCorrect: true,
        explanation: "Failing to disclose sponsored content is misleading and often illegal. Authentic reviews should clearly state any financial relationships."
      }
    ]
  },
  {
    id: "3",
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
    title: "Analyzing Viral Content",
    description: "A trending video about AI technology is going viral. Identify elements that need deeper investigation:",
    type: "word-selection",
    difficulty: "intermediate",
    xpReward: 15,
    passage: "A viral TikTok claims a new AI app can predict your future career success with 99% accuracy. The creator, who has 2M followers, demonstrates the app using cherry-picked examples of successful predictions. The app is free to download but requires access to your social media accounts and personal data. Comments are filled with users sharing their positive experiences, though most accounts were created recently. The creator mentions that major tech companies are interested in the technology but can't name them due to 'confidentiality agreements.'",
    keyWords: [
      {
        word: "99% accuracy",
        explanation: "This is an extraordinary claim that requires extraordinary evidence. Such precise accuracy claims for complex predictions are often red flags."
      },
      {
        word: "cherry-picked examples",
        explanation: "Selective examples can create a misleading impression of success by hiding failures or less impressive results."
      },
      {
        word: "requires access to your social media accounts",
        explanation: "Data collection requirements raise privacy concerns and could indicate potential misuse of personal information."
      }
    ]
  },
  {
    id: "10",
    title: "Beyond Clickbait Headlines",
    type: "matching",
    description: "Match these viral headlines with their more accurate underlying stories. Learn to spot how headlines can mislead:",
    difficulty: "advanced",
    xpReward: 20,
    pairs: [
      {
        id: "10a",
        claim: "SHOCKING: This Student's Phone App Made Them a Millionaire Overnight! 🤑",
        evidence: "College student's app gained popularity over six months, eventually receiving venture capital funding after extensive development and marketing"
      },
      {
        id: "10b",
        claim: "Scientists Say Your Favorite Social Media App Is Rewiring Your Brain! 🧠",
        evidence: "Research suggests extended social media use may affect attention patterns and dopamine responses, but more long-term studies are needed"
      },
      {
        id: "10c",
        claim: "This Simple Hack Will Get You Verified on Instagram in 24 Hours! ✓",
        evidence: "Official verification process requires meeting platform guidelines and can take weeks, with no guaranteed approval"
      }
    ]
  }
];

export const modernChallenges: Challenge[] = [
  {
    id: "15",
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
    id: "16",
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
  },
  {
    id: "17",
    title: "Digital Wellness and Attention Economy",
    type: "highlight",
    description: "Analyze how technology affects our thinking and behavior patterns. Identify common justifications and misconceptions about digital habits.",
    difficulty: "intermediate",
    xpReward: 15,
    statement: "I've been trying to focus on work, but I keep checking my phone. The notifications give me a little dopamine hit, and I tell myself it's important to stay connected. Sometimes I'll open Instagram to check one thing and find myself still scrolling an hour later. I feel more productive when I'm multitasking between different apps and conversations. Besides, isn't this just how modern work culture is?",
    highlights: [
      {
        text: "dopamine hit",
        explanation: "Recognition of how apps exploit natural reward systems to create habitual usage patterns"
      },
      {
        text: "still scrolling an hour later",
        explanation: "Infinite scroll and algorithmic content feeds are designed to capture and retain attention indefinitely"
      },
      {
        text: "productive when I'm multitasking",
        explanation: "Common misconception about multitasking efficiency, which often reduces deep focus and quality of work"
      }
    ]
  },
  {
    id: "18",
    title: "Evidence-Based Decision Making",
    type: "matching",
    description: "Evaluate different types of evidence in modern digital contexts. Learn to distinguish between reliable and unreliable sources of information.",
    difficulty: "intermediate",
    xpReward: 15,
    pairs: [
      {
        id: "18a",
        claim: "This skincare product has 10k positive reviews!",
        evidence: "Analysis reveals many reviews are from incentivized customers and bot accounts"
      },
      {
        id: "18b",
        claim: "Everyone on TikTok is using this studying technique",
        evidence: "Limited peer-reviewed research on the method's effectiveness across different learning styles"
      },
      {
        id: "18c",
        claim: "My friend tried this diet and lost 20 pounds",
        evidence: "Individual anecdote that doesn't account for different metabolisms, lifestyles, and long-term sustainability"
      }
    ]
  },
  {
    id: "19",
    title: "System Failure Analysis",
    type: "highlight",
    description: "Examine how multiple factors contribute to system breakdowns in modern organizations. Identify interconnected causes rather than simple blame attribution.",
    difficulty: "advanced",
    xpReward: 20,
    statement: "The new app launch was a disaster. The servers crashed right after launch because too many users tried to log in at once. The marketing team had done an amazing job building hype on social media, but the development team said they weren't given enough time for proper testing. Customer service was overwhelmed with complaints, and our brand reputation took a hit. The CEO blamed the technical team, who blamed the project managers, who blamed the unrealistic deadline.",
    highlights: [
      {
        text: "marketing team had done an amazing job building hype",
        explanation: "Success in one area (marketing) can create problems if not coordinated with other systems (technical infrastructure)"
      },
      {
        text: "weren't given enough time for proper testing",
        explanation: "Pressure to meet deadlines can lead to cutting crucial preparation steps, creating cascade failures"
      },
      {
        text: "blamed the technical team, who blamed the project managers",
        explanation: "Linear blame attribution often masks systemic issues in organizational structure and communication"
      }
    ]
  },
  {
    id: "20",
    title: "Long-Term Impact Analysis",
    type: "matching",
    description: "Analyze how current technological and social trends might shape future society. Consider multiple dimensions of change and potential consequences.",
    difficulty: "advanced",
    xpReward: 20,
    pairs: [
      {
        id: "20a",
        claim: "Rise of AI-generated content in creative industries",
        evidence: "Shifts in job markets, questions of artistic authenticity, potential loss of human creative development, and changes in how we value original work"
      },
      {
        id: "20b",
        claim: "Increasing reliance on gig economy platforms",
        evidence: "Changes in worker protections, evolution of career planning, impacts on traditional employment, and shifts in professional skill development"
      },
      {
        id: "20c",
        claim: "Growing preference for virtual social interactions",
        evidence: "Effects on emotional intelligence, changes in community building, impacts on mental health, and evolution of social norms"
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
  ...generationalChallenges,
  ...modernChallenges
]);
