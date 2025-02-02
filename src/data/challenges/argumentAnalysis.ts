import { Challenge } from "../challengeTypes";

export const argumentAnalysisChallenges: Challenge[] = [
  {
    id: "arg1",
    title: "Social Media Debate Analysis",
    description: "You're scrolling through comments on a post about whether college is worth the cost. Identify the logical fallacy in this comment:\n\n\"My friend dropped out of college and now makes six figures as a programmer. Anyone who says you need college to succeed is just brainwashed by the education system.\"",
    type: "fallacy",
    difficulty: "beginner",
    xpReward: 10,
    options: [
      {
        id: "arg1a",
        text: "Hasty Generalization (using one example to make a broad conclusion)",
        isCorrect: true,
        explanation: "The commenter uses a single success story (their friend) to conclude that college is unnecessary for everyone."
      },
      {
        id: "arg1b",
        text: "Ad Hominem (attacking the person instead of the argument)",
        isCorrect: false,
        explanation: "While dismissive, the comment doesn't primarily attack individuals."
      },
      {
        id: "arg1c",
        text: "False Dilemma (presenting only two options)",
        isCorrect: false,
        explanation: "The comment doesn't present only two options explicitly."
      },
      {
        id: "arg1d",
        text: "Appeal to Authority (citing an expert opinion)",
        isCorrect: false,
        explanation: "No authority figures are cited in this argument."
      }
    ]
  },
  {
    id: "arg2",
    title: "Product Marketing Analysis",
    description: "You see this advertisement: \"Scientists agree that antioxidants are good for health. Therefore, our $50 SuperBerry juice, packed with antioxidants, is essential for your wellness routine.\"\n\nWhich TWO logical flaws appear in this argument?",
    type: "fallacy",
    difficulty: "intermediate",
    xpReward: 15,
    options: [
      {
        id: "arg2a",
        text: "Appeal to Authority",
        isCorrect: false,
        explanation: "Scientists' agreement about antioxidants is actually valid evidence."
      },
      {
        id: "arg2b",
        text: "False Causation",
        isCorrect: false,
        explanation: "The ad doesn't claim direct causation."
      },
      {
        id: "arg2c",
        text: "Non Sequitur (conclusion doesn't follow from premises)",
        isCorrect: true,
        explanation: "The jump from \"antioxidants are good\" to \"our expensive juice is essential\" doesn't logically follow."
      },
      {
        id: "arg2d",
        text: "Bandwagon Appeal",
        isCorrect: false,
        explanation: "The ad doesn't rely on popularity."
      },
      {
        id: "arg2e",
        text: "False Equivalence (treating different things as the same)",
        isCorrect: true,
        explanation: "The ad falsely equates general antioxidant benefits with their specific product's necessity."
      }
    ]
  },
  {
    id: "arg3",
    title: "News Article Analysis",
    description: "Read this news article excerpt about a local policy change and identify the sentences that contain unsupported claims or logical flaws:",
    type: "word-selection",
    difficulty: "advanced",
    xpReward: 20,
    passage: "The city council's decision to increase parking fees has been met with widespread criticism. Every business owner in the downtown area agrees that this will destroy local commerce. Studies show that higher parking fees always lead to decreased foot traffic. The mayor, who previously worked for a parking management company, clearly has ulterior motives. Similar policies in other cities have had mixed results, with some reporting increased use of public transport while others saw declining retail sales. The additional revenue will be used to improve public transportation, though no specific plans have been announced yet.",
    keyWords: [
      {
        word: "Every business owner in the downtown area agrees that this will destroy local commerce",
        explanation: "Hasty generalization and hyperbole - unlikely that literally every business owner agrees, and 'destroy' is an extreme claim without evidence"
      },
      {
        word: "Studies show that higher parking fees always lead to decreased foot traffic",
        explanation: "Absolute claim ('always') without specific evidence or acknowledgment of varying circumstances"
      },
      {
        word: "The mayor, who previously worked for a parking management company, clearly has ulterior motives",
        explanation: "Ad hominem attack - dismissing the policy based on personal history rather than its merits"
      }
    ]
  },
  {
    id: "arg4",
    title: "Real-World Fallacy Recognition",
    description: "Match these common social situations with the logical fallacies they demonstrate.",
    type: "matching",
    difficulty: "intermediate",
    xpReward: 15,
    pairs: [
      {
        id: "pair1",
        claim: "If you really cared about the environment, you'd never use a car.",
        evidence: "No True Scotsman: The 'true environmentalist' argument creates an unrealistic purity test"
      },
      {
        id: "pair2",
        claim: "Everyone's investing in crypto now, so it must be a good idea.",
        evidence: "Bandwagon Appeal: Relies on popularity rather than merit"
      },
      {
        id: "pair3",
        claim: "That research can't be trusted because the scientist once worked for a corporation.",
        evidence: "Ad Hominem: Attacks the researcher's background instead of the research"
      },
      {
        id: "pair4",
        claim: "Either you support my political candidate or you hate this country.",
        evidence: "False Dilemma: Presents a false choice between two extremes"
      }
    ]
  },
  {
    id: "arg5",
    title: "Strength of Arguments",
    description: "In a debate about implementing a four-day work week, which argument is strongest?",
    type: "fallacy",
    difficulty: "advanced",
    xpReward: 20,
    options: [
      {
        id: "arg5a",
        text: "It's obvious that a four-day work week is better because people hate working five days.",
        isCorrect: false,
        explanation: "Relies on emotional appeal and assumption"
      },
      {
        id: "arg5b",
        text: "Studies in multiple countries show similar or increased productivity with four-day work weeks, plus reduced burnout and lower operating costs.",
        isCorrect: true,
        explanation: "Uses specific evidence, multiple factors, and real-world data"
      },
      {
        id: "arg5c",
        text: "Every progressive company is moving to four-day weeks, so we'll look bad if we don't.",
        isCorrect: false,
        explanation: "Appeals to trends rather than merit"
      },
      {
        id: "arg5d",
        text: "Anyone who wants to work five days clearly doesn't value work-life balance.",
        isCorrect: false,
        explanation: "Creates a false character attack"
      }
    ]
  },
  {
    id: "arg6",
    title: "Identifying Hidden Assumptions",
    description: "\"Since the library's new late fee policy was implemented, book returns have decreased. The policy must be making people keep books longer.\"\n\nWhat's the key hidden assumption in this argument?",
    type: "fallacy",
    difficulty: "intermediate",
    xpReward: 15,
    options: [
      {
        id: "arg6a",
        text: "Libraries shouldn't charge late fees",
        isCorrect: false,
        explanation: "This is a separate debate, not an assumption in the argument"
      },
      {
        id: "arg6b",
        text: "People don't value library books",
        isCorrect: false,
        explanation: "Not assumed in the original argument"
      },
      {
        id: "arg6c",
        text: "The policy change is the only factor affecting return rates",
        isCorrect: true,
        explanation: "The argument assumes no other factors (like seasonal changes, COVID, etc.) could explain the decrease"
      },
      {
        id: "arg6d",
        text: "Higher fees lead to better compliance",
        isCorrect: false,
        explanation: "The argument actually suggests the opposite"
      }
    ]
  },
  {
    id: "ct1",
    title: "Social Media Health Claims",
    description: "You're scrolling through social media and see these health-related posts. Which ones demonstrate circular reasoning?",
    type: "fallacy",
    difficulty: "intermediate",
    xpReward: 15,
    options: [
      {
        id: "ct1a",
        text: "This detox tea works because it cleanses your body of toxins. You can tell it's cleansing because it's a detox tea.",
        isCorrect: true,
        explanation: "This is circular reasoning because it uses the claim (it's a detox tea) to prove itself, without providing any actual evidence of how it works or what toxins it removes."
      },
      {
        id: "ct1b",
        text: "Our multivitamin contains 12 essential nutrients that studies show may help support immune function.",
        isCorrect: false,
        explanation: "While this might be a marketing claim, it's not circular reasoning - it refers to external evidence (studies) rather than using the claim to prove itself."
      },
      {
        id: "ct1c",
        text: "Natural medicine is better because it's natural. And we know natural things are better for you.",
        isCorrect: true,
        explanation: "This is circular reasoning because it assumes 'natural is better' to prove that 'natural is better' without providing any independent evidence or reasoning."
      }
    ]
  },
  {
    id: "ct2",
    title: "Political Debate Analysis",
    description: "During a local town hall meeting about public transportation funding, which statements represent strawman arguments?",
    type: "fallacy",
    difficulty: "intermediate",
    xpReward: 15,
    options: [
      {
        id: "ct2a",
        text: "The opposition wants to eliminate all cars and force everyone to take overcrowded buses!",
        isCorrect: true,
        explanation: "This misrepresents a likely proposal for increased public transit funding as an extreme position of banning all cars, making it a classic strawman argument."
      },
      {
        id: "ct2b",
        text: "The current bus system is running at 85% capacity during peak hours, suggesting we need more routes.",
        isCorrect: false,
        explanation: "This uses specific data to make a reasonable argument rather than misrepresenting an opposing position."
      },
      {
        id: "ct2c",
        text: "Anyone who supports reducing bus service clearly wants poor people to lose their jobs.",
        isCorrect: true,
        explanation: "This strawman distorts a position about service adjustment into an attack on the poor, misrepresenting the actual argument."
      }
    ]
  },
  {
    id: "ct3",
    title: "Celebrity Endorsements",
    description: "You're reading product reviews online. Which statements demonstrate an appeal to authority?",
    type: "fallacy",
    difficulty: "intermediate",
    xpReward: 15,
    options: [
      {
        id: "ct3a",
        text: "This skincare line must be effective because [Famous Actor] says it's the secret to their perfect skin.",
        isCorrect: true,
        explanation: "This relies on a celebrity's endorsement rather than scientific evidence, despite the celebrity having no relevant expertise in dermatology."
      },
      {
        id: "ct3b",
        text: "According to clinical trials conducted by dermatologists, 85% of participants showed improvement after 8 weeks.",
        isCorrect: false,
        explanation: "This cites relevant scientific evidence rather than merely appealing to authority figures."
      },
      {
        id: "ct3c",
        text: "My favorite lifestyle influencer swears by this supplement, so it must be safe and effective.",
        isCorrect: true,
        explanation: "This appeals to an influencer's authority on health matters without any supporting scientific evidence."
      }
    ]
  },
  {
    id: "ct4",
    title: "Technology Policy Debate",
    description: "In a discussion about social media regulation, identify which arguments represent slippery slope fallacies.",
    type: "fallacy",
    difficulty: "intermediate",
    xpReward: 15,
    options: [
      {
        id: "ct4a",
        text: "If we start requiring age verification, next they'll demand our fingerprints, then DNA samples, and eventually we'll live in a complete surveillance state!",
        isCorrect: true,
        explanation: "This exaggerates a specific policy proposal into an extreme scenario without evidence for each step in the claimed progression."
      },
      {
        id: "ct4b",
        text: "Based on similar policies in other countries, age verification might increase administrative costs by 15-20%.",
        isCorrect: false,
        explanation: "This makes a specific, reasonable prediction based on existing evidence rather than claiming an extreme inevitable outcome."
      },
      {
        id: "ct4c",
        text: "If we let platforms moderate content, soon they'll be censoring everything and we'll lose all free speech forever!",
        isCorrect: true,
        explanation: "This makes an extreme leap from content moderation to complete censorship without justifying the connection."
      }
    ]
  },
  {
    id: "ct5",
    title: "Customer Review Analysis",
    description: "You're researching a new restaurant. Which conclusions demonstrate hasty generalization?",
    type: "fallacy",
    difficulty: "beginner",
    xpReward: 10,
    options: [
      {
        id: "ct5a",
        text: "The restaurant was crowded on opening night, so it must be the most popular place in town.",
        isCorrect: true,
        explanation: "This generalizes from a single, unusual night (opening) to make a broad claim about overall popularity."
      },
      {
        id: "ct5b",
        text: "After analyzing 500 reviews over six months, the restaurant maintains a 4.2-star average rating.",
        isCorrect: false,
        explanation: "This uses a large, representative sample over time to draw a reasonable conclusion."
      },
      {
        id: "ct5c",
        text: "My friend got food poisoning there once, so the restaurant must have terrible hygiene standards.",
        isCorrect: true,
        explanation: "This generalizes from a single incident to make a broad claim about overall restaurant quality."
      }
    ]
  },
  {
    id: "ct6",
    title: "Health Trends Analysis",
    description: "Examine these health-related claims. Which ones demonstrate the post hoc fallacy?",
    type: "fallacy",
    difficulty: "intermediate",
    xpReward: 15,
    options: [
      {
        id: "ct6a",
        text: "I started using this crystal necklace, and my headaches went away the next day. The crystal must have healing powers!",
        isCorrect: true,
        explanation: "This assumes the crystal caused the improvement simply because it happened afterward, ignoring other possible causes."
      },
      {
        id: "ct6b",
        text: "In controlled studies, patients who took this medication showed 40% fewer symptoms compared to the placebo group.",
        isCorrect: false,
        explanation: "This uses controlled scientific methodology to establish causation, not just temporal sequence."
      },
      {
        id: "ct6c",
        text: "Ever since they installed 5G towers in our neighborhood, more people have been getting colds. The towers must be making us sick!",
        isCorrect: true,
        explanation: "This assumes causation from temporal sequence, ignoring other factors that could explain increased illness rates."
      }
    ]
  },
  {
    id: "ct7",
    title: "Marketing Message Analysis",
    description: "Review these advertising messages. Which ones primarily rely on appeal to emotion rather than facts?",
    type: "fallacy",
    difficulty: "beginner",
    xpReward: 10,
    options: [
      {
        id: "ct7a",
        text: "Don't let your family down! Only bad parents would choose a cheaper car seat for their precious child.",
        isCorrect: true,
        explanation: "This manipulates parental guilt and fear without providing safety data or product specifications."
      },
      {
        id: "ct7b",
        text: "Our car seat exceeded federal safety standards by 50% in independent crash tests.",
        isCorrect: false,
        explanation: "This uses specific, verifiable data rather than emotional manipulation to make its point."
      },
      {
        id: "ct7c",
        text: "Every time you buy non-organic produce, you're destroying the planet your children will inherit!",
        isCorrect: true,
        explanation: "This relies on guilt and environmental fear without providing specific data about environmental impacts."
      }
    ]
  },
  {
    id: "ct8",
    title: "News Media Analysis",
    description: "Examine these news headlines and identify which ones create false equivalence.",
    type: "fallacy",
    difficulty: "advanced",
    xpReward: 20,
    options: [
      {
        id: "ct8a",
        text: "Scientists and Social Media Influencers Disagree: Who Should You Trust About Climate Change?",
        isCorrect: true,
        explanation: "This creates a false equivalence between peer-reviewed scientific research and unqualified social media opinions."
      },
      {
        id: "ct8b",
        text: "Climate Study Shows Varying Predictions from Different Research Teams",
        isCorrect: false,
        explanation: "This acknowledges legitimate scientific debate between qualified researchers rather than creating false equivalence."
      },
      {
        id: "ct8c",
        text: "Both Sides Claim Victory: Factory Pollution vs Local Health Concerns",
        isCorrect: true,
        explanation: "This creates a false equivalence between corporate profit motives and public health impacts."
      }
    ]
  },
  {
    id: "ct9",
    title: "Political Debate Tactics",
    description: "During a debate about education funding, identify which responses are red herrings.",
    type: "fallacy",
    difficulty: "advanced",
    xpReward: 20,
    options: [
      {
        id: "ct9a",
        text: "Instead of discussing school budgets, let's talk about how the opposition leader took an expensive vacation last year!",
        isCorrect: true,
        explanation: "This introduces an irrelevant personal attack to divert from the education funding discussion."
      },
      {
        id: "ct9b",
        text: "The data shows our per-student spending is 20% below the national average.",
        isCorrect: false,
        explanation: "This directly addresses the education funding issue with relevant data."
      },
      {
        id: "ct9c",
        text: "Why focus on education when there are potholes all over our streets? Fix the roads first!",
        isCorrect: true,
        explanation: "This introduces an unrelated issue to divert attention from the education funding discussion."
      }
    ]
  }
];
