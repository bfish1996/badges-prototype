'use client'

import { useState } from 'react'
import { Badge, BadgeConfig, AvailableLesson } from '@/types/badge'
import { availableLessons } from '@/data/mockBadges'
import { 
  X, 
  CheckCircle, 
  Clock, 
  Coins, 
  Upload, 
  Send, 
  Code, 
  BookOpen,
  Zap,
  AlertCircle,
  Calendar,
  AlertTriangle
} from 'lucide-react'
import MilestoneProgress from './MilestoneProgress'
import ReferralProgress from './ReferralProgress'
import { DeadlineUtils } from '@/utils/deadlineUtils'

interface BadgeDetailViewProps {
  badge: Badge
  config?: BadgeConfig
  onClose: () => void
  onProgress?: (badgeId: string, newProgress: number) => void
}

export default function BadgeDetailView({ badge, config, onClose, onProgress }: BadgeDetailViewProps) {
  const [codeInput, setCodeInput] = useState('')
  const [evidenceText, setEvidenceText] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const progressPercentage = badge.progress && badge.totalRequired 
    ? (badge.progress / badge.totalRequired) * 100 
    : 0

  const deadlineStatus = DeadlineUtils.calculateDeadlineStatus(badge, config?.deadline)

  const getRequiredLessons = (): AvailableLesson[] => {
    if (!config?.lesson?.requiredLessonIds) return []
    return availableLessons.filter(lesson => 
      config.lesson!.requiredLessonIds.includes(lesson.id)
    )
  }

  const handleCodeSubmit = async () => {
    if (!codeInput.trim()) return
    
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const validCodes = config?.codeEntry?.validCodes || []
    const isValidCode = validCodes.includes(codeInput.trim())
    
    if (isValidCode) {
      setSubmitMessage('✅ Code validated! Progress updated.')
      if (onProgress) {
        onProgress(badge.id, (badge.progress || 0) + 1)
      }
      setCodeInput('')
    } else {
      setSubmitMessage('❌ Invalid code. Please check and try again.')
    }
    
    setIsSubmitting(false)
    setTimeout(() => setSubmitMessage(''), 3000)
  }

  const handleEvidenceSubmit = async () => {
    if (!evidenceText.trim() && !selectedFile) return
    
    setIsSubmitting(true)
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitMessage('✅ Evidence analyzed and accepted! Badge progress updated.')
    if (onProgress) {
      onProgress(badge.id, badge.totalRequired || 1)
    }
    setEvidenceText('')
    setSelectedFile(null)
    
    setIsSubmitting(false)
    setTimeout(() => setSubmitMessage(''), 3000)
  }

  const handleToolUsage = async () => {
    setIsSubmitting(true)
    // Simulate tool usage tracking
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setSubmitMessage('✅ Tool usage recorded! Progress updated.')
    if (onProgress) {
      onProgress(badge.id, (badge.progress || 0) + 1)
    }
    
    setIsSubmitting(false)
    setTimeout(() => setSubmitMessage(''), 3000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`text-5xl ${badge.isEarned ? 'badge-earned' : 'opacity-70'}`}>
              {badge.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{badge.name}</h2>
              <p className="text-gray-600">{badge.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Badge Status & Rewards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <Coins className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-800">{badge.doshReward}</div>
              <div className="text-sm text-yellow-700">Dosh Reward</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-blue-800 capitalize">
                {badge.frequency !== 'none' ? badge.frequency : 'One-time'}
              </div>
              <div className="text-sm text-blue-700">Frequency</div>
            </div>
          </div>

          {/* Deadline Status */}
          {badge.deadline && !badge.isEarned && (
            <div className={`p-4 rounded-lg mb-8 ${
              deadlineStatus.isExpired ? 'bg-red-50 border-2 border-red-200' :
              deadlineStatus.isExpiring ? 'bg-orange-50 border-2 border-orange-200' :
              'bg-blue-50 border-2 border-blue-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {deadlineStatus.isExpired ? (
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  ) : (
                    <Calendar className="w-6 h-6 text-blue-600" />
                  )}
                  <div>
                    <h3 className={`font-semibold ${
                      deadlineStatus.isExpired ? 'text-red-800' :
                      deadlineStatus.isExpiring ? 'text-orange-800' :
                      'text-blue-800'
                    }`}>
                      {deadlineStatus.isExpired ? 'Badge Expired' :
                       deadlineStatus.isExpiring ? 'Deadline Approaching' :
                       'Deadline Set'}
                    </h3>
                    <p className={`text-sm ${
                      deadlineStatus.isExpired ? 'text-red-600' :
                      deadlineStatus.isExpiring ? 'text-orange-600' :
                      'text-blue-600'
                    }`}>
                      {deadlineStatus.deadlineText} • Due {DeadlineUtils.formatDeadline(badge.deadline)}
                    </p>
                  </div>
                </div>
                {config?.deadline?.allowExtensions && deadlineStatus.isExpiring && (
                  <button className="px-3 py-1 text-xs bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    Request Extension
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {badge.progress !== undefined && badge.totalRequired && !badge.isEarned && (
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{badge.progress}/{badge.totalRequired}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-primary-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Milestone Progress - moved inside badge */}
          {badge.milestones && badge.milestoneConfig?.enabled && (
            <div className="mb-8">
              <MilestoneProgress
                milestones={badge.milestones}
                milestoneConfig={badge.milestoneConfig}
                currentProgress={badge.progress || 0}
                totalRequired={badge.totalRequired || 1}
                frequency={badge.frequency}
              />
            </div>
          )}

          {/* Action Interface */}
          {!badge.isEarned && (
            <div className="space-y-6">
              {/* Code Entry */}
              {badge.actionType === 'code-entry' && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Code className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Enter Participation Code</h3>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-800 font-medium">Get your code from:</p>
                        <ul className="text-sm text-blue-700 mt-1 list-disc list-inside">
                          <li>Event attendance (after webinars, workshops)</li>
                          <li>Survey completion (provided at the end)</li>
                          <li>Community activities and special events</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                      placeholder={`Enter ${config?.codeEntry?.codeLength || 6}-character code`}
                      maxLength={config?.codeEntry?.codeLength || 6}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={handleCodeSubmit}
                      disabled={isSubmitting || !codeInput.trim()}
                      className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      <span>Submit</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Evidence Upload */}
              {badge.actionType === 'evidence-upload' && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Upload className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Submit Evidence</h3>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Topic: {config?.evidence?.topic}</h4>
                    <p className="text-sm text-gray-600">{config?.evidence?.aiPrompt}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Written Evidence
                      </label>
                      <textarea
                        value={evidenceText}
                        onChange={(e) => setEvidenceText(e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Share your insights, research, and analysis on the topic..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Minimum {config?.evidence?.requiredLength || 500} characters recommended
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        File Upload (Optional)
                      </label>
                      <input
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        accept=".pdf,.doc,.docx,.txt"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <button
                      onClick={handleEvidenceSubmit}
                      disabled={isSubmitting || (!evidenceText.trim() && !selectedFile)}
                      className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      ) : (
                        <Zap className="w-5 h-5" />
                      )}
                      <span>Analyze with AI</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tool Usage */}
              {badge.actionType === 'tool-usage' && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Zap className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Use Tool</h3>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Tool: {config?.toolUsage?.toolName}</h4>
                    <p className="text-sm text-gray-600">
                      Use this tool {config?.toolUsage?.usageCount} times to complete the badge.
                      Current progress: {badge.progress || 0}/{config?.toolUsage?.usageCount || 1}
                    </p>
                  </div>

                  <button
                    onClick={handleToolUsage}
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    ) : (
                      <Zap className="w-5 h-5" />
                    )}
                    <span>Launch {config?.toolUsage?.toolName}</span>
                  </button>
                </div>
              )}

              {/* Lesson Completion - Automatic */}
              {badge.actionType === 'lesson-completion' && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <BookOpen className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Complete Lessons</h3>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">Category: {config?.lesson?.category}</h4>
                      <span className="text-sm text-gray-600">
                        Completion: {config?.lesson?.completionOrder === 'sequential' ? 'Sequential' : 'Any Order'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Complete {getRequiredLessons().length} required lessons to earn this badge.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {getRequiredLessons().map((lesson, index) => (
                      <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              index < (badge.progress || 0) 
                                ? 'border-green-500 bg-green-500' 
                                : 'border-gray-300'
                            }`}>
                              {index < (badge.progress || 0) && (
                                <CheckCircle className="w-4 h-4 text-white" />
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-medium text-gray-900">{lesson.name}</h5>
                              <div className="flex items-center space-x-2 text-xs">
                                <span className={`px-2 py-1 rounded-full ${
                                  lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                                  lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {lesson.difficulty}
                                </span>
                                {lesson.estimatedDuration && (
                                  <span className="text-gray-500">{lesson.estimatedDuration}min</span>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{lesson.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <AlertCircle className="w-4 h-4 inline mr-2" />
                      Lesson completion is tracked automatically when you complete lessons in the learning system.
                    </p>
                  </div>
                </div>
              )}

              {/* Webhook - Automatic */}
              {badge.actionType === 'webhook' && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Zap className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Automatic Progress</h3>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800">
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                      This badge progress is tracked automatically based on your account activity. 
                      No manual action required!
                    </p>
                    <p className="text-xs text-green-700 mt-2">
                      Event: {config?.webhook?.eventType}
                    </p>
                  </div>
                </div>
              )}

              {/* Referral Progress */}
              {badge.actionType === 'referral' && config?.referral && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <ReferralProgress
                    badge={badge}
                    config={config}
                    userId="current-user"
                  />
                </div>
              )}
            </div>
          )}

          {/* Earned State */}
          {badge.isEarned && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">{badge.icon}</div>
              <div className="flex items-center justify-center space-x-2 text-green-600 text-xl font-semibold mb-2">
                <CheckCircle className="w-6 h-6" />
                <span>Badge Earned!</span>
              </div>
              <p className="text-gray-600">
                Completed on {new Date(badge.earnedDate!).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Submit Message */}
          {submitMessage && (
            <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-center">
              <p className="text-sm text-gray-700">{submitMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
