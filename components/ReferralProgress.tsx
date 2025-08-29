'use client'

import { useState } from 'react'
import { Badge, BadgeConfig, ReferralProgress as ReferralProgressType } from '@/types/badge'
import { ReferralUtils } from '@/utils/referralUtils'
import { Copy, Share2, Users, CheckCircle, Clock, ExternalLink } from 'lucide-react'

interface ReferralProgressProps {
  badge: Badge
  config: BadgeConfig
  userId?: string
}

export default function ReferralProgress({ badge, config, userId = 'current-user' }: ReferralProgressProps) {
  const [copySuccess, setCopySuccess] = useState(false)
  
  if (!config.referral) return null

  const referralProgress = ReferralUtils.getMockReferralProgress(userId, badge.id)
  const progress = ReferralUtils.calculateReferralProgress(
    referralProgress, 
    config.referral.requiresFriendCompletion
  )

  const handleCopyLink = async () => {
    const success = await ReferralUtils.copyReferralLink(referralProgress.referralLink)
    if (success) {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  const handleShareLink = () => {
    const shareText = ReferralUtils.formatReferralLinkForSharing(
      referralProgress.referralLink,
      'You' // In a real app, this would be the user's name
    )
    
    if (navigator.share) {
      navigator.share({
        title: 'Join our Financial Learning Platform',
        text: shareText,
      })
    } else {
      // Fallback for browsers without native sharing
      handleCopyLink()
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-600" />
          Referral Progress
        </h3>
        <div className="text-sm text-gray-600">
          {progress}/{config.referral.referralsRequired} completed
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {referralProgress.totalReferrals}
          </div>
          <div className="text-sm text-gray-600">Friends Invited</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {referralProgress.completedReferrals}
          </div>
          <div className="text-sm text-gray-600">
            {config.referral.requiresFriendCompletion ? 'Completed Lessons' : 'Active Referrals'}
          </div>
        </div>
      </div>

      {/* Referral Link Section */}
      <div className="bg-white rounded-lg p-4 space-y-3">
        <h4 className="font-medium text-gray-900">Your Referral Link</h4>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={referralProgress.referralLink}
            readOnly
            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-mono"
          />
          <button
            onClick={handleCopyLink}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            title="Copy link"
          >
            {copySuccess ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleShareLink}
            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            title="Share link"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        {copySuccess && (
          <p className="text-sm text-green-600">Link copied to clipboard!</p>
        )}
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-lg p-4 space-y-2">
        <h4 className="font-medium text-gray-900">Requirements</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            Friend signs up using your link
          </li>
          {config.referral.requiresFriendCompletion && (
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Friend completes {config.referral.friendLessonsRequired || 1} lesson{(config.referral.friendLessonsRequired || 1) > 1 ? 's' : ''}
            </li>
          )}
          {config.referral.referralReward && (
            <li className="flex items-center text-blue-600">
              <ExternalLink className="w-4 h-4 mr-2" />
              Earn {config.referral.referralReward.doshReward} Dosh per referral
            </li>
          )}
        </ul>
      </div>

      {/* Recent Referrals */}
      {referralProgress.referrals.length > 0 && (
        <div className="bg-white rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-gray-900">Recent Referrals</h4>
          <div className="space-y-2">
            {referralProgress.referrals.slice(0, 3).map((referral) => (
              <div key={referral.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${referral.friendMeetsRequirement ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <div>
                    <div className="text-sm font-medium">
                      {referral.referredUserEmail || 'Friend'}
                    </div>
                    <div className="text-xs text-gray-500">
                      Joined {new Date(referral.referredDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {referral.friendMeetsRequirement ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-xs">Complete</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-yellow-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-xs">Pending</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
