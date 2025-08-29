import { ReferralProgress } from '@/types/badge'

// Mock referral progress data for demonstration
export const mockReferralProgress: Record<string, ReferralProgress> = {
  'current-user-10': {
    userId: 'current-user',
    badgeId: '10',
    referralLink: 'https://yourapp.com/signup?ref=ABC123DEF456',
    referrals: [
      {
        id: 'ref-1',
        referredUserId: 'friend-1',
        referredUserEmail: 'sarah.johnson@example.com',
        referredDate: '2024-02-01',
        friendCompletedLessons: 2,
        friendMeetsRequirement: true,
        earnedDate: '2024-02-01'
      }
    ],
    totalReferrals: 1,
    completedReferrals: 1
  },
  'current-user-11': {
    userId: 'current-user',
    badgeId: '11',
    referralLink: 'https://yourapp.com/signup?ref=XYZ789GHI012',
    referrals: [
      {
        id: 'ref-2',
        referredUserId: 'friend-1',
        referredUserEmail: 'sarah.johnson@example.com',
        referredDate: '2024-02-01',
        friendCompletedLessons: 2,
        friendMeetsRequirement: true,
        earnedDate: '2024-02-01'
      },
      {
        id: 'ref-3',
        referredUserId: 'friend-2',
        referredUserEmail: 'mike.chen@example.com',
        referredDate: '2024-02-05',
        friendCompletedLessons: 0,
        friendMeetsRequirement: false
      }
    ],
    totalReferrals: 2,
    completedReferrals: 1
  }
}

// Helper function to get referral progress for a user and badge
export function getReferralProgress(userId: string, badgeId: string): ReferralProgress | null {
  const key = `${userId}-${badgeId}`
  return mockReferralProgress[key] || null
}
