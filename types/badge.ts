export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  doshReward: number
  type: BadgeType
  frequency: BadgeFrequency
  actionType: ActionType
  isEarned?: boolean
  earnedDate?: string
  progress?: number
  totalRequired?: number
  milestones?: MilestoneReward[]
  milestoneConfig?: MilestoneConfig
  deadline?: string // ISO date string
  isExpired?: boolean // Calculated field
  daysUntilDeadline?: number // Calculated field
}

export interface MilestoneReward {
  id: string
  name: string
  description: string
  icon: string
  doshReward: number
  triggerAt: number // What progress point triggers this (e.g., 2 for day 2, 7 for week 1)
  triggerType: 'count' | 'day' | 'week' | 'percentage'
  isEarned: boolean
  earnedDate?: string
}

export interface MilestoneConfig {
  enabled: boolean
  autoGenerate: boolean // Auto-generate milestones based on frequency
  customMilestones: boolean // Allow custom milestone configuration
}

export type BadgeType = 'one-off' | 'habitual'
export type BadgeFrequency = 'daily' | 'weekly' | 'monthly' | 'none'
export type ActionType = 'webhook' | 'evidence-upload' | 'tool-usage' | 'code-entry' | 'lesson-completion' | 'referral'

export interface WebhookConfig {
  webhookUrl: string
  eventType: string
  requiredData?: Record<string, any>
}

export interface EvidenceConfig {
  topic: string
  aiPrompt: string
  requiredLength?: number
}

export interface ToolUsageConfig {
  toolName: string
  usageCount: number
  toolType: 'budgeting-calculator' | 'savings-tracker' | 'expense-analyzer'
}

export interface CodeEntryConfig {
  codeLength: number
  codePattern?: string
  validCodes?: string[]
}



export interface LessonConfig {
  requiredLessonIds: string[]
  completionOrder?: 'any' | 'sequential'
  category?: string
}

export interface ReferralConfig {
  referralsRequired: number
  referralReward?: {
    doshReward: number
  }
  requiresFriendCompletion: boolean // If true, friend must complete a lesson
  friendLessonsRequired?: number // How many lessons friend must complete
  generateLink: boolean // Whether to auto-generate referral links
}

// Referral tracking interface
export interface ReferralProgress {
  userId: string
  badgeId: string
  referralLink: string
  referrals: ReferralRecord[]
  totalReferrals: number
  completedReferrals: number // Referrals where friend completed required lessons
}

export interface ReferralRecord {
  id: string
  referredUserId: string
  referredUserEmail?: string
  referredDate: string
  friendCompletedLessons: number
  friendMeetsRequirement: boolean
  earnedDate?: string
}

// Available lessons for dropdown selection
export interface AvailableLesson {
  id: string
  name: string
  description: string
  category: string
  estimatedDuration?: number // in minutes
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
}

// Lesson requirement for progress tracking
export interface LessonRequirement extends AvailableLesson {
  isCompleted: boolean
  completedDate?: string
}

export interface BadgeConfig {
  webhook?: WebhookConfig
  evidence?: EvidenceConfig
  toolUsage?: ToolUsageConfig
  codeEntry?: CodeEntryConfig
  lesson?: LessonConfig
  referral?: ReferralConfig
  deadline?: DeadlineConfig
}

export interface DeadlineConfig {
  enabled: boolean
  type: 'fixed' | 'rolling' // Fixed date or rolling deadline from start
  fixedDate?: string // ISO date string for fixed deadlines
  rollingDays?: number // Number of days from when user starts
  warningDays?: number // Days before deadline to show warning (default: 3)
  allowExtensions?: boolean // Whether deadlines can be extended
}

export interface UserProgress {
  userId: string
  badgeId: string
  progress: number
  totalRequired: number
  lastUpdated: string
  earnedMiniBadges: string[]
}
