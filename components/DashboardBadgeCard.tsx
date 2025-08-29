'use client'

import { Badge, BadgeConfig } from '@/types/badge'
import { Edit, Trash2, Clock, Coins, Users } from 'lucide-react'

interface DashboardBadgeCardProps {
  badge: Badge
  config?: BadgeConfig
  onEdit: (badge: Badge, config?: BadgeConfig) => void
  onDelete: (badgeId: string) => void
}

export default function DashboardBadgeCard({ badge, config, onEdit, onDelete }: DashboardBadgeCardProps) {
  const getActionTypeLabel = (actionType: string) => {
    const labels = {
      'webhook': 'Webhook',
      'evidence-upload': 'Evidence Upload',
      'tool-usage': 'Tool Usage',
      'code-entry': 'Code Entry',
      'lesson-completion': 'Lesson Completion'
    }
    return labels[actionType as keyof typeof labels] || actionType
  }

  const getConfigSummary = () => {
    if (!config) return 'No configuration'
    
    switch (badge.actionType) {
      case 'webhook':
        return `${config.webhook?.eventType || 'Unknown event'}`
      case 'evidence-upload':
        return `Topic: ${config.evidence?.topic || 'Not specified'}`
      case 'tool-usage':
        return `${config.toolUsage?.toolName || 'Unknown tool'} (${config.toolUsage?.usageCount || 0}x)`
      case 'code-entry':
        return `${config.codeEntry?.validCodes?.length || 0} valid codes (events/surveys)`
      case 'lesson-completion':
        return `${config.lesson?.requiredLessonIds?.length || 0} lessons (${config.lesson?.completionOrder || 'any'} order)`
      default:
        return 'Basic configuration'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{badge.icon}</div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{badge.name}</h3>
            <p className="text-gray-600 text-sm">{badge.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(badge, config)}
            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(badge.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="bg-yellow-50 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Coins className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">{badge.doshReward} Dosh</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Type:</span>
          <span className="font-medium capitalize">{badge.type}</span>
        </div>
        
        {badge.frequency !== 'none' && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Frequency:</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="font-medium capitalize">{badge.frequency}</span>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Action:</span>
          <span className="font-medium">{getActionTypeLabel(badge.actionType)}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Config:</span>
          <span className="font-medium text-xs text-gray-600">{getConfigSummary()}</span>
        </div>

        {badge.type === 'habitual' && badge.totalRequired && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Required:</span>
            <span className="font-medium">{badge.totalRequired} times</span>
          </div>
        )}

        {badge.milestones && badge.milestones.length > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Milestones:</span>
            <span className="font-medium">
              {badge.milestones.length} rewards 
              {badge.milestoneConfig?.autoGenerate ? ' (auto)' : ' (custom)'}
            </span>
          </div>
        )}
        
        {badge.milestoneConfig?.enabled && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Milestone Type:</span>
            <span className="font-medium">
              {badge.milestoneConfig.autoGenerate ? 'Auto-generated' : 'Custom configured'}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Badge ID: {badge.id}</span>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{badge.isEarned ? 'Earned' : 'Available'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
