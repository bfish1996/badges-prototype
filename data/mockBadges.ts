import { Badge, BadgeConfig, AvailableLesson } from '@/types/badge'

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Loan Streak Master',
    description: 'Complete 5 consecutive loan payments on time',
    icon: '🎯',
    doshReward: 50,
    type: 'one-off',
    frequency: 'none',
    actionType: 'webhook',
    progress: 3,
    totalRequired: 5,
    deadline: '2024-03-15',
    milestoneConfig: {
      enabled: true,
      autoGenerate: false,
      customMilestones: true
    },
    milestones: [
      {
        id: '1-1',
        name: 'First Payment',
        description: 'Made your first on-time payment',
        icon: '⭐',
        doshReward: 5,
        triggerAt: 1,
        triggerType: 'count',
        isEarned: true,
        earnedDate: '2024-01-15'
      },
      {
        id: '1-2',
        name: 'Building Momentum',
        description: 'Made 3 consecutive payments',
        icon: '🔥',
        doshReward: 10,
        triggerAt: 3,
        triggerType: 'count',
        isEarned: true,
        earnedDate: '2024-02-15'
      },
      {
        id: '1-3',
        name: 'Almost There',
        description: 'Just one more payment to complete the streak',
        icon: '🎯',
        doshReward: 15,
        triggerAt: 4,
        triggerType: 'count',
        isEarned: false
      }
    ]
  },
  {
    id: '2',
    name: 'Daily Budgeter',
    description: 'Use the budgeting calculator daily for a week',
    icon: '📊',
    doshReward: 25,
    type: 'habitual',
    frequency: 'daily',
    actionType: 'tool-usage',
    progress: 0,
    totalRequired: 7,
    deadline: '2024-02-28',
    milestoneConfig: {
      enabled: true,
      autoGenerate: true,
      customMilestones: false
    },
    milestones: [
      {
        id: '2-1',
        name: 'Day 2 Streak',
        description: 'Used budgeting tool for 2 consecutive days',
        icon: '📊',
        doshReward: 5,
        triggerAt: 2,
        triggerType: 'day',
        isEarned: true,
        earnedDate: '2024-01-17'
      },
      {
        id: '2-2',
        name: 'Halfway Hero',
        description: 'Completed 4 days of budgeting',
        icon: '📈',
        doshReward: 10,
        triggerAt: 4,
        triggerType: 'day',
        isEarned: true,
        earnedDate: '2024-01-19'
      },
      {
        id: '2-3',
        name: 'Weekend Warrior',
        description: 'Made it through the weekend with budgeting',
        icon: '🎯',
        doshReward: 8,
        triggerAt: 6,
        triggerType: 'day',
        isEarned: false
      }
    ]
  },
  {
    id: '3',
    name: 'Research Scholar',
    description: 'Research and write about financial planning topics',
    icon: '🎓',
    doshReward: 75,
    type: 'one-off',
    frequency: 'none',
    actionType: 'evidence-upload',
    isEarned: true,
    earnedDate: '2024-01-20',
    deadline: '2024-02-20'
  },
  {
    id: '4',
    name: 'Event Participant',
    description: 'Attend events or complete surveys using participation codes',
    icon: '🎪',
    doshReward: 30,
    type: 'habitual',
    frequency: 'monthly',
    actionType: 'code-entry',
    progress: 0,
    totalRequired: 1,
    deadline: '2024-03-31'
  },
  {
    id: '5',
    name: 'Savings Champion',
    description: 'Use savings tracker for 30 consecutive days',
    icon: '💰',
    doshReward: 100,
    type: 'habitual',
    frequency: 'daily',
    actionType: 'tool-usage',
    progress: 0,
    totalRequired: 30,
    milestoneConfig: {
      enabled: true,
      autoGenerate: false,
      customMilestones: true
    },
    milestones: [
      {
        id: '5-1',
        name: 'First Week Complete',
        description: 'Tracked savings for 7 consecutive days',
        icon: '🗓️',
        doshReward: 15,
        triggerAt: 1,
        triggerType: 'week',
        isEarned: true,
        earnedDate: '2024-01-22'
      },
      {
        id: '5-2',
        name: 'Two Week Champion',
        description: 'Tracked savings for 14 consecutive days',
        icon: '🏆',
        doshReward: 25,
        triggerAt: 2,
        triggerType: 'week',
        isEarned: true,
        earnedDate: '2024-01-29'
      },
      {
        id: '5-3',
        name: 'Three Quarter Mark',
        description: 'You\'re 75% of the way to your savings goal!',
        icon: '📊',
        doshReward: 20,
        triggerAt: 75,
        triggerType: 'percentage',
        isEarned: false
      }
    ]
  },
  {
    id: '6',
    name: 'Community Voice',
    description: 'Vote on 3 bank propositions this quarter',
    icon: '🗳️',
    doshReward: 40,
    type: 'habitual',
    frequency: 'weekly',
    actionType: 'code-entry',
    progress: 0,
    totalRequired: 3
  },
  {
    id: '7',
    name: 'Financial Foundations',
    description: 'Complete the essential financial literacy lessons',
    icon: '📚',
    doshReward: 100,
    type: 'one-off',
    frequency: 'none',
    actionType: 'lesson-completion',
    progress: 2,
    totalRequired: 3,
    deadline: '2024-03-10',
    milestoneConfig: {
      enabled: false,
      autoGenerate: false,
      customMilestones: false
    }
  },
  {
    id: '8',
    name: 'Investment Scholar',
    description: 'Master the complete investment fundamentals series',
    icon: '📈',
    doshReward: 150,
    type: 'one-off',
    frequency: 'none',
    actionType: 'lesson-completion',
    progress: 1,
    totalRequired: 4
  },
  {
    id: '9',
    name: 'Credit Expert',
    description: 'Complete all credit management lessons in order',
    icon: '🎓',
    doshReward: 80,
    type: 'one-off',
    frequency: 'none',
    actionType: 'lesson-completion',
    progress: 0,
    totalRequired: 3,
    deadline: '2024-05-15'
  },
  {
    id: '10',
    name: 'Friend Connector',
    description: 'Refer 3 friends who complete at least one lesson',
    icon: '🤝',
    doshReward: 75,
    type: 'one-off',
    frequency: 'none',
    actionType: 'referral',
    progress: 1,
    totalRequired: 3,
    deadline: '2024-04-01',
    milestoneConfig: {
      enabled: true,
      autoGenerate: false,
      customMilestones: true
    },
    milestones: [
      {
        id: '10-1',
        name: 'First Referral',
        description: 'Successfully referred your first friend',
        icon: '👋',
        doshReward: 15,
        triggerAt: 1,
        triggerType: 'count',
        isEarned: true,
        earnedDate: '2024-02-01'
      },
      {
        id: '10-2',
        name: 'Growing Network',
        description: 'Two friends have joined thanks to you',
        icon: '🌟',
        doshReward: 25,
        triggerAt: 2,
        triggerType: 'count',
        isEarned: false
      }
    ]
  },
  {
    id: '11',
    name: 'Community Builder',
    description: 'Refer 10 friends to build a strong learning community',
    icon: '🏘️',
    doshReward: 200,
    type: 'habitual',
    frequency: 'monthly',
    actionType: 'referral',
    progress: 1,
    totalRequired: 10,
    deadline: '2024-06-30',
    milestoneConfig: {
      enabled: true,
      autoGenerate: true,
      customMilestones: false
    }
  }
]

// Available lessons for dropdown selection
export const availableLessons: AvailableLesson[] = [
  {
    id: 'lesson-budget-101',
    name: 'Introduction to Budgeting',
    description: 'Learn the basics of creating and maintaining a personal budget',
    category: 'Budgeting',
    estimatedDuration: 25,
    difficulty: 'beginner'
  },
  {
    id: 'lesson-savings-101',
    name: 'Understanding Savings Accounts',
    description: 'Different types of savings accounts and how to choose the right one',
    category: 'Savings',
    estimatedDuration: 20,
    difficulty: 'beginner'
  },
  {
    id: 'lesson-emergency-fund',
    name: 'Building an Emergency Fund',
    description: 'Why you need an emergency fund and how to build one',
    category: 'Savings',
    estimatedDuration: 30,
    difficulty: 'beginner'
  },
  {
    id: 'lesson-invest-basics',
    name: 'Investment Fundamentals',
    description: 'Introduction to stocks, bonds, and other investment vehicles',
    category: 'Investing',
    estimatedDuration: 45,
    difficulty: 'intermediate'
  },
  {
    id: 'lesson-risk-management',
    name: 'Risk and Portfolio Management',
    description: 'Understanding investment risk and diversification strategies',
    category: 'Investing',
    estimatedDuration: 40,
    difficulty: 'intermediate'
  },
  {
    id: 'lesson-retirement-planning',
    name: 'Retirement Investment Strategies',
    description: 'Long-term investment planning for retirement',
    category: 'Investing',
    estimatedDuration: 50,
    difficulty: 'advanced'
  },
  {
    id: 'lesson-tax-strategies',
    name: 'Tax-Efficient Investing',
    description: 'Maximizing after-tax returns through smart investment choices',
    category: 'Investing',
    estimatedDuration: 35,
    difficulty: 'advanced'
  },
  {
    id: 'lesson-credit-basics',
    name: 'Understanding Credit Scores',
    description: 'How credit scores work and what affects them',
    category: 'Credit Management',
    estimatedDuration: 30,
    difficulty: 'beginner'
  },
  {
    id: 'lesson-credit-building',
    name: 'Building Good Credit',
    description: 'Strategies for building and maintaining excellent credit',
    category: 'Credit Management',
    estimatedDuration: 35,
    difficulty: 'intermediate'
  },
  {
    id: 'lesson-credit-repair',
    name: 'Credit Repair and Recovery',
    description: 'How to recover from credit mistakes and improve your score',
    category: 'Credit Management',
    estimatedDuration: 40,
    difficulty: 'intermediate'
  }
]

export const mockBadgeConfigs: Record<string, BadgeConfig> = {
  '1': {
    webhook: {
      webhookUrl: 'https://api.creditspring.co.uk/webhooks/loan-payment',
      eventType: 'payment_completed',
      requiredData: { status: 'on_time', consecutive_count: 5 }
    },
    deadline: {
      enabled: true,
      type: 'fixed',
      fixedDate: '2024-03-15',
      warningDays: 5,
      allowExtensions: false
    }
  },
  '2': {
    toolUsage: {
      toolName: 'Budgeting Calculator',
      usageCount: 7,
      toolType: 'budgeting-calculator'
    },
    deadline: {
      enabled: true,
      type: 'rolling',
      rollingDays: 14,
      warningDays: 3,
      allowExtensions: true
    }
  },
  '3': {
    evidence: {
      topic: 'Financial Planning Strategies',
      aiPrompt: 'Analyze the uploaded content for insights on financial planning. Look for evidence of research, understanding of concepts, and practical application.',
      requiredLength: 500
    }
  },
  '4': {
    codeEntry: {
      codeLength: 6,
      codePattern: 'EVENT-[A-Z0-9]{6}',
      validCodes: ['EVENT-ABC123', 'EVENT-DEF456', 'SURVEY-XYZ789', 'WEBINAR-GHI012']
    }
  },
  '5': {
    toolUsage: {
      toolName: 'Savings Tracker',
      usageCount: 30,
      toolType: 'savings-tracker'
    }
  },
  '6': {
    codeEntry: {
      codeLength: 8,
      codePattern: 'VOTE-[A-Z0-9]{8}',
      validCodes: ['VOTE-PROP001', 'VOTE-PROP002', 'VOTE-PROP003']
    }
  },
  '7': {
    lesson: {
      requiredLessonIds: ['lesson-budget-101', 'lesson-savings-101', 'lesson-emergency-fund'],
      completionOrder: 'any',
      category: 'Financial Foundations'
    },
    deadline: {
      enabled: true,
      type: 'fixed',
      fixedDate: '2024-03-10',
      warningDays: 7,
      allowExtensions: true
    }
  },
  '8': {
    lesson: {
      requiredLessonIds: ['lesson-invest-basics', 'lesson-risk-management', 'lesson-retirement-planning', 'lesson-tax-strategies'],
      completionOrder: 'sequential',
      category: 'Investment Mastery'
    }
  },
  '9': {
    lesson: {
      requiredLessonIds: ['lesson-credit-basics', 'lesson-credit-building', 'lesson-credit-repair'],
      completionOrder: 'sequential',
      category: 'Credit Mastery'
    }
  },
  '10': {
    referral: {
      referralsRequired: 3,
      referralReward: {
        doshReward: 10
      },
      requiresFriendCompletion: true,
      friendLessonsRequired: 1,
      generateLink: true
    }
  },
  '11': {
    referral: {
      referralsRequired: 10,
      referralReward: {
        doshReward: 15
      },
      requiresFriendCompletion: true,
      friendLessonsRequired: 1,
      generateLink: true
    }
  }
}
