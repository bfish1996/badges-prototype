import { Badge, DeadlineConfig } from '@/types/badge'

export class DeadlineUtils {
  // Calculate deadline status for a badge
  static calculateDeadlineStatus(badge: Badge, config?: DeadlineConfig) {
    if (!badge.deadline || badge.isEarned) {
      return {
        isExpired: false,
        daysUntilDeadline: null,
        isExpiring: false,
        deadlineText: null
      }
    }

    const now = new Date()
    const deadline = new Date(badge.deadline)
    const timeDiff = deadline.getTime() - now.getTime()
    const daysUntilDeadline = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    
    const warningDays = config?.warningDays || 3
    const isExpired = daysUntilDeadline < 0
    const isExpiring = daysUntilDeadline >= 0 && daysUntilDeadline <= warningDays

    let deadlineText = ''
    if (isExpired) {
      const daysOverdue = Math.abs(daysUntilDeadline)
      deadlineText = daysOverdue === 1 ? '1 day overdue' : `${daysOverdue} days overdue`
    } else if (daysUntilDeadline === 0) {
      deadlineText = 'Due today'
    } else if (daysUntilDeadline === 1) {
      deadlineText = 'Due tomorrow'
    } else {
      deadlineText = `${daysUntilDeadline} days left`
    }

    return {
      isExpired,
      daysUntilDeadline,
      isExpiring,
      deadlineText
    }
  }

  // Generate a rolling deadline from a start date
  static generateRollingDeadline(startDate: string, rollingDays: number): string {
    const start = new Date(startDate)
    const deadline = new Date(start)
    deadline.setDate(deadline.getDate() + rollingDays)
    return deadline.toISOString().split('T')[0] // Return YYYY-MM-DD format
  }

  // Update badge with calculated deadline fields
  static updateBadgeWithDeadlineStatus(badge: Badge, config?: DeadlineConfig): Badge {
    const status = this.calculateDeadlineStatus(badge, config)
    
    return {
      ...badge,
      isExpired: status.isExpired,
      daysUntilDeadline: status.daysUntilDeadline ?? undefined
    }
  }

  // Format deadline for display
  static formatDeadline(deadline: string): string {
    const date = new Date(deadline)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Get deadline color based on status
  static getDeadlineColor(badge: Badge, config?: DeadlineConfig): string {
    const status = this.calculateDeadlineStatus(badge, config)
    
    if (status.isExpired) return 'text-red-600 bg-red-50'
    if (status.isExpiring) return 'text-orange-600 bg-orange-50'
    return 'text-blue-600 bg-blue-50'
  }

  // Check if deadline can be extended
  static canExtendDeadline(badge: Badge, config?: DeadlineConfig): boolean {
    return !badge.isEarned && config?.allowExtensions === true
  }

  // Extend deadline by specified days
  static extendDeadline(currentDeadline: string, extensionDays: number): string {
    const deadline = new Date(currentDeadline)
    deadline.setDate(deadline.getDate() + extensionDays)
    return deadline.toISOString().split('T')[0]
  }

  // Get upcoming deadlines (within specified days)
  static getUpcomingDeadlines(badges: Badge[], withinDays: number = 7): Badge[] {
    const now = new Date()
    
    return badges.filter(badge => {
      if (!badge.deadline || badge.isEarned) return false
      
      const deadline = new Date(badge.deadline)
      const timeDiff = deadline.getTime() - now.getTime()
      const daysUntilDeadline = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
      
      return daysUntilDeadline >= 0 && daysUntilDeadline <= withinDays
    }).sort((a, b) => {
      const aDeadline = new Date(a.deadline!).getTime()
      const bDeadline = new Date(b.deadline!).getTime()
      return aDeadline - bDeadline
    })
  }

  // Get overdue badges
  static getOverdueBadges(badges: Badge[]): Badge[] {
    const now = new Date()
    
    return badges.filter(badge => {
      if (!badge.deadline || badge.isEarned) return false
      
      const deadline = new Date(badge.deadline)
      return deadline.getTime() < now.getTime()
    }).sort((a, b) => {
      const aDeadline = new Date(a.deadline!).getTime()
      const bDeadline = new Date(b.deadline!).getTime()
      return aDeadline - bDeadline // Oldest overdue first
    })
  }
}
