import { ReferralProgress, ReferralRecord } from '@/types/badge'
import { getReferralProgress } from '@/data/mockReferrals'

export class ReferralUtils {
  // Generate a unique referral link for a user and badge
  static generateReferralLink(userId: string, badgeId: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourapp.com'
    const referralCode = this.generateReferralCode(userId, badgeId)
    return `${baseUrl}/signup?ref=${referralCode}`
  }

  // Generate a unique referral code
  static generateReferralCode(userId: string, badgeId: string): string {
    const timestamp = Date.now().toString(36)
    const userHash = this.hashString(userId).substring(0, 4)
    const badgeHash = this.hashString(badgeId).substring(0, 2)
    return `${userHash}${badgeHash}${timestamp}`.toUpperCase()
  }

  // Simple hash function for generating codes
  private static hashString(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36)
  }

  // Get referral progress for a user and badge
  static getMockReferralProgress(userId: string, badgeId: string): ReferralProgress {
    const existingProgress = getReferralProgress(userId, badgeId)
    
    if (existingProgress) {
      return existingProgress
    }
    
    // Fallback for badges without mock data
    const referralLink = this.generateReferralLink(userId, badgeId)
    
    return {
      userId,
      badgeId,
      referralLink,
      referrals: [],
      totalReferrals: 0,
      completedReferrals: 0
    }
  }

  // Validate referral code format
  static isValidReferralCode(code: string): boolean {
    // Basic validation - should be alphanumeric and reasonable length
    return /^[A-Z0-9]{8,15}$/.test(code)
  }

  // Extract user and badge info from referral code (mock implementation)
  static parseReferralCode(code: string): { userId?: string; badgeId?: string } {
    if (!this.isValidReferralCode(code)) {
      return {}
    }
    
    // In a real implementation, you'd decode the actual user/badge info
    // For now, return mock data
    return {
      userId: 'mock-user-id',
      badgeId: 'mock-badge-id'
    }
  }

  // Calculate referral progress for a badge
  static calculateReferralProgress(
    referralProgress: ReferralProgress,
    requiresFriendCompletion: boolean
  ): number {
    if (requiresFriendCompletion) {
      return referralProgress.completedReferrals
    }
    return referralProgress.totalReferrals
  }

  // Check if friend meets the lesson completion requirement
  static doesFriendMeetRequirement(
    friendLessonsCompleted: number,
    requiredLessons: number
  ): boolean {
    return friendLessonsCompleted >= requiredLessons
  }

  // Format referral link for sharing
  static formatReferralLinkForSharing(link: string, userName?: string): string {
    const message = userName 
      ? `Hey! ${userName} invited you to join our financial learning platform. Sign up using this link and we both get rewards!`
      : 'Join our financial learning platform and help your friend earn rewards!'
    
    return `${message}\n\n${link}`
  }

  // Copy referral link to clipboard (browser only)
  static async copyReferralLink(link: string): Promise<boolean> {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(link)
        return true
      } catch (err) {
        console.error('Failed to copy referral link:', err)
        return false
      }
    }
    return false
  }
}
