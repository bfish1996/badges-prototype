'use client'

import { useState } from 'react'
import { Badge, BadgeType, BadgeFrequency, ActionType, BadgeConfig, MilestoneReward, MilestoneConfig, AvailableLesson, DeadlineConfig } from '@/types/badge'
import { availableLessons } from '@/data/mockBadges'
import { Plus, Trash2, Save, Trophy } from 'lucide-react'

interface BadgeFormProps {
  badge?: Badge
  config?: BadgeConfig
  onSave: (badge: Badge, config: BadgeConfig) => void
  onCancel: () => void
}

export default function BadgeForm({ badge, config, onSave, onCancel }: BadgeFormProps) {
  const [formData, setFormData] = useState<Partial<Badge>>({
    name: badge?.name || '',
    description: badge?.description || '',
    icon: badge?.icon || '🏆',
    doshReward: badge?.doshReward || 0,
    type: badge?.type || 'one-off',
    frequency: badge?.frequency || 'none',
    actionType: badge?.actionType || 'webhook',
    totalRequired: badge?.totalRequired || 1,
    deadline: badge?.deadline || '',
  })

  const [milestoneConfig, setMilestoneConfig] = useState<MilestoneConfig>(
    badge?.milestoneConfig || {
      enabled: false,
      autoGenerate: true,
      customMilestones: false
    }
  )

  const [milestones, setMilestones] = useState<MilestoneReward[]>(
    badge?.milestones || []
  )

  const [configData, setConfigData] = useState<BadgeConfig>(
    config || {
      webhook: { webhookUrl: '', eventType: '' },
      evidence: { topic: '', aiPrompt: '' },
      toolUsage: { toolName: '', usageCount: 1, toolType: 'budgeting-calculator' },
      codeEntry: { codeLength: 6, validCodes: [''] },
      lesson: { 
        requiredLessonIds: [],
        completionOrder: 'any' 
      },
      deadline: {
        enabled: false,
        type: 'fixed',
        warningDays: 3,
        allowExtensions: false
      }
    }
  )

  const [deadlineConfig, setDeadlineConfig] = useState<DeadlineConfig>(
    config?.deadline || {
      enabled: false,
      type: 'fixed',
      warningDays: 3,
      allowExtensions: false
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newBadge: Badge = {
      id: badge?.id || Date.now().toString(),
      name: formData.name!,
      description: formData.description!,
      icon: formData.icon!,
      doshReward: formData.doshReward!,

      type: formData.type!,
      frequency: formData.frequency!,
      actionType: formData.actionType!,
      totalRequired: formData.totalRequired,
      progress: badge?.progress || 0,
      deadline: formData.deadline || undefined,
      isEarned: badge?.isEarned || false,
      milestoneConfig: milestoneConfig,
      milestones: milestoneConfig.enabled ? milestones : undefined
    }

    onSave(newBadge, { ...configData, deadline: deadlineConfig })
  }

  const updateConfig = (field: keyof BadgeConfig, value: any) => {
    setConfigData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addValidCode = () => {
    if (configData.codeEntry) {
      updateConfig('codeEntry', {
        ...configData.codeEntry,
        validCodes: [...(configData.codeEntry.validCodes || []), '']
      })
    }
  }

  const removeValidCode = (index: number) => {
    if (configData.codeEntry) {
      const newCodes = configData.codeEntry.validCodes?.filter((_, i) => i !== index) || []
      updateConfig('codeEntry', {
        ...configData.codeEntry,
        validCodes: newCodes
      })
    }
  }

  const updateValidCode = (index: number, value: string) => {
    if (configData.codeEntry) {
      const newCodes = [...(configData.codeEntry.validCodes || [])]
      newCodes[index] = value
      updateConfig('codeEntry', {
        ...configData.codeEntry,
        validCodes: newCodes
      })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Badge Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon (Emoji)
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="🏆"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dosh Reward
            </label>
            <input
              type="number"
              value={formData.doshReward}
              onChange={(e) => setFormData(prev => ({ ...prev, doshReward: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deadline (Optional)
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Badge Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as BadgeType }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="one-off">One-off</option>
              <option value="habitual">Habitual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frequency
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value as BadgeFrequency }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={formData.type === 'one-off'}
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action Type
            </label>
            <select
              value={formData.actionType}
              onChange={(e) => setFormData(prev => ({ ...prev, actionType: e.target.value as ActionType }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="webhook">Webhook</option>
              <option value="evidence-upload">Evidence Upload</option>
              <option value="tool-usage">Tool Usage</option>
              <option value="code-entry">Code Entry</option>
              <option value="lesson-completion">Lesson Completion</option>
            </select>
          </div>
        </div>

        {formData.type === 'habitual' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Required (for completion)
            </label>
            <input
              type="number"
              value={formData.totalRequired}
              onChange={(e) => setFormData(prev => ({ ...prev, totalRequired: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              min="1"
            />
          </div>
        )}

        {/* Deadline Configuration */}
        {formData.deadline && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Deadline Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={deadlineConfig.enabled}
                    onChange={(e) => setDeadlineConfig(prev => ({ ...prev, enabled: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Enable deadline warnings</span>
                </label>
              </div>

              {deadlineConfig.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Warning Days
                    </label>
                    <input
                      type="number"
                      value={deadlineConfig.warningDays}
                      onChange={(e) => setDeadlineConfig(prev => ({ ...prev, warningDays: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      min="1"
                      max="30"
                    />
                    <p className="text-xs text-gray-500 mt-1">Days before deadline to show warning</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deadline Type
                    </label>
                    <select
                      value={deadlineConfig.type}
                      onChange={(e) => setDeadlineConfig(prev => ({ ...prev, type: e.target.value as 'fixed' | 'rolling' }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="fixed">Fixed Date</option>
                      <option value="rolling">Rolling (from start)</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={deadlineConfig.allowExtensions}
                        onChange={(e) => setDeadlineConfig(prev => ({ ...prev, allowExtensions: e.target.checked }))}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Allow extensions</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Milestone Configuration */}
        {formData.type === 'habitual' && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>Milestone Rewards</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="enableMilestones"
                  checked={milestoneConfig.enabled}
                  onChange={(e) => setMilestoneConfig(prev => ({ ...prev, enabled: e.target.checked }))}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="enableMilestones" className="text-sm font-medium text-gray-700">
                  Enable milestone rewards for this badge
                </label>
              </div>

              {milestoneConfig.enabled && (
                <div className="space-y-4 pl-6 border-l-2 border-primary-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="autoGenerate"
                        name="milestoneType"
                        checked={milestoneConfig.autoGenerate}
                        onChange={(e) => setMilestoneConfig(prev => ({ 
                          ...prev, 
                          autoGenerate: e.target.checked,
                          customMilestones: !e.target.checked
                        }))}
                        className="border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="autoGenerate" className="text-sm text-gray-700">
                        Auto-generate milestones
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="customMilestones"
                        name="milestoneType"
                        checked={milestoneConfig.customMilestones}
                        onChange={(e) => setMilestoneConfig(prev => ({ 
                          ...prev, 
                          customMilestones: e.target.checked,
                          autoGenerate: !e.target.checked
                        }))}
                        className="border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="customMilestones" className="text-sm text-gray-700">
                        Custom milestones
                      </label>
                    </div>
                  </div>

                  {milestoneConfig.autoGenerate && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Auto-generate:</strong> Milestones will be automatically created based on your badge frequency and total required count. 
                        For example, a 7-day daily badge might have milestones at day 2, day 4, and day 6.
                      </p>
                    </div>
                  )}

                  {milestoneConfig.customMilestones && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Custom Milestones
                      </label>
                      
                      {milestones.map((milestone, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Milestone Name
                              </label>
                              <input
                                type="text"
                                value={milestone.name}
                                onChange={(e) => {
                                  const newMilestones = [...milestones]
                                  newMilestones[index] = { ...milestone, name: e.target.value }
                                  setMilestones(newMilestones)
                                }}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                                placeholder="First Week Complete"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Icon (Emoji)
                              </label>
                              <input
                                type="text"
                                value={milestone.icon}
                                onChange={(e) => {
                                  const newMilestones = [...milestones]
                                  newMilestones[index] = { ...milestone, icon: e.target.value }
                                  setMilestones(newMilestones)
                                }}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                                placeholder="🗓️"
                              />
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Description
                            </label>
                            <textarea
                              value={milestone.description}
                              onChange={(e) => {
                                const newMilestones = [...milestones]
                                newMilestones[index] = { ...milestone, description: e.target.value }
                                setMilestones(newMilestones)
                              }}
                              rows={2}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                              placeholder="Completed your first week of consistent tracking"
                            />
                          </div>
                          
                          <div className="grid grid-cols-4 gap-3 mb-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Trigger Type
                              </label>
                              <select
                                value={milestone.triggerType}
                                onChange={(e) => {
                                  const newMilestones = [...milestones]
                                  newMilestones[index] = { ...milestone, triggerType: e.target.value as any }
                                  setMilestones(newMilestones)
                                }}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                              >
                                <option value="count">Count</option>
                                <option value="day">Day</option>
                                <option value="week">Week</option>
                                <option value="percentage">Percentage</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Trigger At
                              </label>
                              <input
                                type="number"
                                value={milestone.triggerAt}
                                onChange={(e) => {
                                  const newMilestones = [...milestones]
                                  newMilestones[index] = { ...milestone, triggerAt: parseInt(e.target.value) || 1 }
                                  setMilestones(newMilestones)
                                }}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                                min="1"
                                placeholder="7"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Dosh Reward
                              </label>
                              <input
                                type="number"
                                value={milestone.doshReward}
                                onChange={(e) => {
                                  const newMilestones = [...milestones]
                                  newMilestones[index] = { ...milestone, doshReward: parseInt(e.target.value) || 0 }
                                  setMilestones(newMilestones)
                                }}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                                min="0"
                                placeholder="10"
                              />
                            </div>

                          </div>
                          
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                const newMilestones = milestones.filter((_, i) => i !== index)
                                setMilestones(newMilestones)
                              }}
                              className="text-red-500 hover:text-red-700 text-sm flex items-center space-x-1"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => {
                          const newMilestone: MilestoneReward = {
                            id: `milestone-${Date.now()}`,
                            name: '',
                            description: '',
                            icon: '🏆',
                            doshReward: 10,

                            triggerAt: 1,
                            triggerType: 'count',
                            isEarned: false
                          }
                          setMilestones([...milestones, newMilestone])
                        }}
                        className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 border-2 border-dashed border-primary-300 rounded-lg p-4 w-full justify-center"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Milestone</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action-specific configuration */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Action Configuration</h3>
          
          {formData.actionType === 'webhook' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook URL
                </label>
                <input
                  type="url"
                  value={configData.webhook?.webhookUrl || ''}
                  onChange={(e) => updateConfig('webhook', { ...configData.webhook, webhookUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://api.example.com/webhook"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type
                </label>
                <input
                  type="text"
                  value={configData.webhook?.eventType || ''}
                  onChange={(e) => updateConfig('webhook', { ...configData.webhook, eventType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="payment_completed"
                />
              </div>
            </div>
          )}

          {formData.actionType === 'evidence-upload' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic
                </label>
                <input
                  type="text"
                  value={configData.evidence?.topic || ''}
                  onChange={(e) => updateConfig('evidence', { ...configData.evidence, topic: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Financial Planning Strategies"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AI Prompt for Analysis
                </label>
                <textarea
                  value={configData.evidence?.aiPrompt || ''}
                  onChange={(e) => updateConfig('evidence', { ...configData.evidence, aiPrompt: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Analyze the uploaded content for insights..."
                />
              </div>
            </div>
          )}

          {formData.actionType === 'tool-usage' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tool Name
                </label>
                <input
                  type="text"
                  value={configData.toolUsage?.toolName || ''}
                  onChange={(e) => updateConfig('toolUsage', { ...configData.toolUsage, toolName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Budgeting Calculator"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usage Count Required
                  </label>
                  <input
                    type="number"
                    value={configData.toolUsage?.usageCount || 1}
                    onChange={(e) => updateConfig('toolUsage', { ...configData.toolUsage, usageCount: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tool Type
                  </label>
                  <select
                    value={configData.toolUsage?.toolType || 'budgeting-calculator'}
                    onChange={(e) => updateConfig('toolUsage', { ...configData.toolUsage, toolType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="budgeting-calculator">Budgeting Calculator</option>
                    <option value="savings-tracker">Savings Tracker</option>
                    <option value="expense-analyzer">Expense Analyzer</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {formData.actionType === 'code-entry' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <div className="text-blue-600">ℹ️</div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Code Entry Usage</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Code entry can be used for various activities including:
                    </p>
                    <ul className="text-sm text-blue-700 mt-1 list-disc list-inside">
                      <li>Event attendance (webinars, workshops, etc.)</li>
                      <li>Survey completion (codes provided after completion)</li>
                      <li>Special promotional activities</li>
                      <li>Community participation rewards</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code Length
                </label>
                <input
                  type="number"
                  value={configData.codeEntry?.codeLength || 6}
                  onChange={(e) => updateConfig('codeEntry', { ...configData.codeEntry, codeLength: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="4"
                  max="20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valid Codes
                </label>
                {configData.codeEntry?.validCodes?.map((code, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => updateValidCode(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="VOTE-ABC123"
                    />
                    <button
                      type="button"
                      onClick={() => removeValidCode(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addValidCode}
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Code</span>
                </button>
              </div>
            </div>
          )}



          {formData.actionType === 'lesson-completion' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={configData.lesson?.category || ''}
                    onChange={(e) => updateConfig('lesson', { ...configData.lesson, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Financial Foundations"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Completion Order
                  </label>
                  <select
                    value={configData.lesson?.completionOrder || 'any'}
                    onChange={(e) => updateConfig('lesson', { ...configData.lesson, completionOrder: e.target.value as 'any' | 'sequential' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="any">Any Order</option>
                    <option value="sequential">Sequential</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Lessons
                </label>
                <div className="space-y-3">
                  {availableLessons.map((lesson) => {
                    const isSelected = configData.lesson?.requiredLessonIds?.includes(lesson.id) || false
                    return (
                      <div 
                        key={lesson.id} 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-200' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => {
                          const currentIds = configData.lesson?.requiredLessonIds || []
                          const newIds = isSelected 
                            ? currentIds.filter(id => id !== lesson.id)
                            : [...currentIds, lesson.id]
                          updateConfig('lesson', { ...configData.lesson, requiredLessonIds: newIds })
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}} // handled by div onClick
                              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{lesson.name}</h4>
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
                            <p className="text-sm text-gray-600 mb-1">{lesson.description}</p>
                            <p className="text-xs text-gray-500">Category: {lesson.category}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                {configData.lesson?.requiredLessonIds && configData.lesson.requiredLessonIds.length > 0 && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>{configData.lesson.requiredLessonIds.length}</strong> lesson{configData.lesson.requiredLessonIds.length !== 1 ? 's' : ''} selected
                      {configData.lesson.completionOrder === 'sequential' && (
                        <span className="ml-2 text-green-700">(must be completed in order)</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{badge ? 'Update Badge' : 'Create Badge'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
