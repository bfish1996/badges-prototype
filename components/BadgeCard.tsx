'use client'

import { Badge, BadgeConfig } from '@/types/badge'
import { CheckCircle, Clock, Coins, BookOpen, Timer, Users, Share2, Calendar, AlertTriangle } from 'lucide-react'
import { DeadlineUtils } from '@/utils/deadlineUtils'

interface BadgeCardProps {
  badge: Badge
  config?: BadgeConfig
  onClaim?: (badgeId: string) => void
  onClick?: () => void
}

export default function BadgeCard({ badge, config, onClaim, onClick }: BadgeCardProps) {
  const progressPercentage = badge.progress && badge.totalRequired 
    ? (badge.progress / badge.totalRequired) * 100 
    : 0

  const deadlineStatus = DeadlineUtils.calculateDeadlineStatus(badge, config?.deadline)

  const handleClaim = () => {
    if (onClaim && !badge.isEarned) {
      onClaim(badge.id)
    }
  }

  return (
    <div 
      className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl cursor-pointer ${
        badge.isEarned ? 'badge-glow ring-2 ring-primary-200' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`text-4xl ${badge.isEarned ? 'badge-earned' : 'opacity-70'}`}>
            {badge.icon}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{badge.name}</h3>
            <p className="text-gray-600 text-sm">{badge.description}</p>
          </div>
        </div>
        {badge.isEarned && (
          <CheckCircle className="text-green-500 w-6 h-6" />
        )}
      </div>

      <div className="space-y-3">
        {/* Rewards */}
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-1">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">{badge.doshReward} Dosh</span>
          </div>
          {badge.frequency !== 'none' && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600 capitalize">{badge.frequency}</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {badge.progress !== undefined && badge.totalRequired && !badge.isEarned && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{badge.progress}/{badge.totalRequired}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Lesson Progress - simplified for card view */}
        {badge.actionType === 'lesson-completion' && config?.lesson && (
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  {config.lesson.requiredLessonIds.length} Lessons Required
                </span>
              </div>
              <span className="text-xs text-blue-600">
                {config.lesson.completionOrder === 'sequential' ? 'Sequential' : 'Any Order'}
              </span>
            </div>
            <p className="text-xs text-blue-700 mt-1">Category: {config.lesson.category}</p>
          </div>
        )}

        {/* Referral Progress - simplified for card view */}
        {badge.actionType === 'referral' && config?.referral && (
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  {config.referral.referralsRequired} Referrals Needed
                </span>
              </div>
              <Share2 className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-green-700">
                {config.referral.requiresFriendCompletion 
                  ? `Friends must complete ${config.referral.friendLessonsRequired || 1} lesson${(config.referral.friendLessonsRequired || 1) > 1 ? 's' : ''}`
                  : 'Friends just need to sign up'
                }
              </p>
              {config.referral.referralReward && (
                <span className="text-xs text-green-600 font-medium">
                  +{config.referral.referralReward.doshReward} Dosh each
                </span>
              )}
            </div>
          </div>
        )}

        {/* Deadline Display */}
        {badge.deadline && !badge.isEarned && (
          <div className={`flex items-center justify-between p-3 rounded-lg ${
            deadlineStatus.isExpired ? 'bg-red-50 border border-red-200' :
            deadlineStatus.isExpiring ? 'bg-orange-50 border border-orange-200' :
            'bg-blue-50 border border-blue-200'
          }`}>
            <div className="flex items-center space-x-2">
              {deadlineStatus.isExpired ? (
                <AlertTriangle className="w-4 h-4 text-red-600" />
              ) : (
                <Calendar className="w-4 h-4 text-blue-600" />
              )}
              <span className={`text-sm font-medium ${
                deadlineStatus.isExpired ? 'text-red-800' :
                deadlineStatus.isExpiring ? 'text-orange-800' :
                'text-blue-800'
              }`}>
                {deadlineStatus.deadlineText}
              </span>
            </div>
            <span className="text-xs text-gray-600">
              {DeadlineUtils.formatDeadline(badge.deadline)}
            </span>
          </div>
        )}

        {/* Action Button */}
        {badge.isEarned ? (
          <div className="flex items-center justify-center py-2 text-green-600 font-medium">
            <CheckCircle className="w-5 h-5 mr-2" />
            Earned on {new Date(badge.earnedDate!).toLocaleDateString()}
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleClaim()
            }}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
              progressPercentage === 100
                ? 'bg-primary-500 hover:bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-500 cursor-not-allowed'
            }`}
            disabled={progressPercentage !== 100}
          >
            {progressPercentage === 100 ? 'Claim Badge' : 'In Progress'}
          </button>
        )}
      </div>
    </div>
  )
}
