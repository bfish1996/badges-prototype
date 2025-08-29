'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import BadgeForm from '@/components/BadgeForm'
import DashboardBadgeCard from '@/components/DashboardBadgeCard'
import { mockBadges, mockBadgeConfigs } from '@/data/mockBadges'
import { Badge, BadgeConfig } from '@/types/badge'
import { Plus, Filter, Search } from 'lucide-react'

export default function Dashboard() {
  const [badges, setBadges] = useState<Badge[]>(mockBadges)
  const [badgeConfigs, setBadgeConfigs] = useState<Record<string, BadgeConfig>>(mockBadgeConfigs)
  const [showForm, setShowForm] = useState(false)
  const [editingBadge, setEditingBadge] = useState<Badge | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'one-off' | 'habitual'>('all')
  const [filterAction, setFilterAction] = useState<'all' | string>('all')

  const handleSaveBadge = (badge: Badge, config: BadgeConfig) => {
    if (editingBadge) {
      setBadges(prev => prev.map(b => b.id === badge.id ? badge : b))
    } else {
      setBadges(prev => [...prev, badge])
    }
    
    setBadgeConfigs(prev => ({
      ...prev,
      [badge.id]: config
    }))
    
    setShowForm(false)
    setEditingBadge(null)
  }

  const handleEditBadge = (badge: Badge, config?: BadgeConfig) => {
    setEditingBadge(badge)
    setShowForm(true)
  }

  const handleDeleteBadge = (badgeId: string) => {
    if (confirm('Are you sure you want to delete this badge?')) {
      setBadges(prev => prev.filter(b => b.id !== badgeId))
      setBadgeConfigs(prev => {
        const newConfigs = { ...prev }
        delete newConfigs[badgeId]
        return newConfigs
      })
    }
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingBadge(null)
  }

  const filteredBadges = badges.filter(badge => {
    const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         badge.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || badge.type === filterType
    const matchesAction = filterAction === 'all' || badge.actionType === filterAction
    
    return matchesSearch && matchesType && matchesAction
  })

  const actionTypes = Array.from(new Set(badges.map(b => b.actionType)))

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Badge Dashboard</h1>
              <p className="text-gray-600 mt-2">Create and manage badges for your users</p>
            </div>
            
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Create Badge</span>
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-gray-900">{badges.length}</div>
                <div className="ml-2 text-sm text-gray-600">Total Badges</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-green-600">
                  {badges.filter(b => b.isEarned).length}
                </div>
                <div className="ml-2 text-sm text-gray-600">Earned</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-blue-600">
                  {badges.filter(b => b.type === 'habitual').length}
                </div>
                <div className="ml-2 text-sm text-gray-600">Habitual</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-purple-600">
                  {badges.reduce((sum, b) => sum + b.doshReward, 0)}
                </div>
                <div className="ml-2 text-sm text-gray-600">Total Dosh</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg p-4 shadow-sm border mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search badges..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Types</option>
                    <option value="one-off">One-off</option>
                    <option value="habitual">Habitual</option>
                  </select>
                </div>
                
                <select
                  value={filterAction}
                  onChange={(e) => setFilterAction(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Actions</option>
                  {actionTypes.map(actionType => (
                    <option key={actionType} value={actionType}>
                      {actionType.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {editingBadge ? 'Edit Badge' : 'Create New Badge'}
            </h2>
            <BadgeForm
              badge={editingBadge || undefined}
              config={editingBadge ? badgeConfigs[editingBadge.id] : undefined}
              onSave={handleSaveBadge}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        {!showForm && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                All Badges ({filteredBadges.length})
              </h2>
            </div>

            {filteredBadges.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No badges found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || filterType !== 'all' || filterAction !== 'all'
                    ? 'Try adjusting your search or filters.'
                    : 'Create your first badge to get started.'}
                </p>
                {!searchTerm && filterType === 'all' && filterAction === 'all' && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Create Your First Badge
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBadges.map((badge) => (
                  <DashboardBadgeCard
                    key={badge.id}
                    badge={badge}
                    config={badgeConfigs[badge.id]}
                    onEdit={handleEditBadge}
                    onDelete={handleDeleteBadge}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
