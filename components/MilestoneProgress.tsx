'use client'

import { MilestoneReward, MilestoneConfig } from '@/types/badge'
import { CheckCircle, Clock, Coins, Calendar, Hash, Percent, Target } from 'lucide-react'

interface MilestoneProgressProps {
  milestones: MilestoneReward[]
  milestoneConfig: MilestoneConfig
  currentProgress: number
  totalRequired: number
  frequency?: string
}

export default function MilestoneProgress({ 
  milestones, 
  milestoneConfig, 
  currentProgress, 
  totalRequired,
  frequency 
}: MilestoneProgressProps) {
  if (!milestoneConfig.enabled || !milestones.length) {
    return null
  }

  const getTriggerTypeIcon = (triggerType: string) => {
    switch (triggerType) {
      case 'day': return <Calendar className="w-3 h-3" />
      case 'week': return <Calendar className="w-3 h-3" />
      case 'count': return <Hash className="w-3 h-3" />
      case 'percentage': return <Percent className="w-3 h-3" />
      default: return <Clock className="w-3 h-3" />
    }
  }

  const getTriggerLabel = (milestone: MilestoneReward) => {
    switch (milestone.triggerType) {
      case 'day':
        return `Day ${milestone.triggerAt}`
      case 'week':
        return milestone.triggerAt === 1 ? '1 Week' : `${milestone.triggerAt} Weeks`
      case 'count':
        return `${milestone.triggerAt}${milestone.triggerAt === 1 ? 'st' : milestone.triggerAt === 2 ? 'nd' : milestone.triggerAt === 3 ? 'rd' : 'th'} completion`
      case 'percentage':
        return `${milestone.triggerAt}% complete`
      default:
        return `Milestone ${milestone.triggerAt}`
    }
  }

  const isMilestoneUnlocked = (milestone: MilestoneReward) => {
    switch (milestone.triggerType) {
      case 'count':
      case 'day':
        return currentProgress >= milestone.triggerAt
      case 'week':
        return currentProgress >= (milestone.triggerAt * 7)
      case 'percentage':
        const currentPercentage = (currentProgress / totalRequired) * 100
        return currentPercentage >= milestone.triggerAt
      default:
        return false
    }
  }

  const sortedMilestones = [...milestones].sort((a, b) => a.triggerAt - b.triggerAt)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700 flex items-center space-x-2">
          <Target className="w-4 h-4" />
          <span>Milestone Rewards</span>
        </h4>
        <div className="text-xs text-gray-500">
          {milestoneConfig.autoGenerate ? 'Auto-generated' : 'Custom milestones'}
        </div>
      </div>

      <div className="space-y-2">
        {sortedMilestones.map((milestone) => {
          const isUnlocked = isMilestoneUnlocked(milestone)
          const canClaim = isUnlocked && !milestone.isEarned
          
          return (
            <div 
              key={milestone.id}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                milestone.isEarned 
                  ? 'bg-green-50 border-green-200 shadow-sm' 
                  : canClaim
                  ? 'bg-yellow-50 border-yellow-200 shadow-sm ring-1 ring-yellow-300'
                  : isUnlocked
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex-shrink-0">
                {milestone.isEarned ? (
                  <div className="relative">
                    <div className="text-2xl">{milestone.icon}</div>
                    <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-500 bg-white rounded-full" />
                  </div>
                ) : canClaim ? (
                  <div className="text-2xl animate-bounce">{milestone.icon}</div>
                ) : (
                  <div className={`text-2xl ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                    {milestone.icon}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h5 className={`text-sm font-medium ${
                    milestone.isEarned 
                      ? 'text-green-800' 
                      : canClaim 
                      ? 'text-yellow-800' 
                      : isUnlocked 
                      ? 'text-blue-800' 
                      : 'text-gray-600'
                  }`}>
                    {milestone.name}
                  </h5>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-xs">
                      {getTriggerTypeIcon(milestone.triggerType)}
                      <span className={`${
                        milestone.isEarned ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {getTriggerLabel(milestone)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className={`text-xs mb-2 ${
                  milestone.isEarned 
                    ? 'text-green-600' 
                    : canClaim 
                    ? 'text-yellow-700' 
                    : 'text-gray-600'
                }`}>
                  {milestone.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs">
                    <Coins className="w-3 h-3 text-yellow-500" />
                    <span className="font-medium">{milestone.doshReward} Dosh</span>
                  </div>
                  
                  {milestone.isEarned && milestone.earnedDate && (
                    <span className="text-xs text-green-600">
                      ✓ {new Date(milestone.earnedDate).toLocaleDateString()}
                    </span>
                  )}
                  
                  {canClaim && (
                    <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                      Ready to claim!
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {milestoneConfig.autoGenerate && (
        <div className="text-xs text-gray-500 text-center py-2 border-t">
          Milestones are automatically generated based on your {frequency} progress
        </div>
      )}
    </div>
  )
}
