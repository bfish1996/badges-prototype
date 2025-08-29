'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import BadgeCard from '@/components/BadgeCard'
import BadgeDetailView from '@/components/BadgeDetailView'
import UserStats from '@/components/UserStats'
import { mockBadges, mockBadgeConfigs } from '@/data/mockBadges'
import { DeadlineUtils } from '@/utils/deadlineUtils'
import { Badge } from '@/types/badge'

export default function Home() {
  const [badges, setBadges] = useState<Badge[]>(mockBadges)
  const [filter, setFilter] = useState<'all' | 'earned' | 'available'>('all')
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)

  const handleClaimBadge = (badgeId: string) => {
    setBadges(prev => 
      prev.map(badge => 
        badge.id === badgeId 
          ? { ...badge, isEarned: true, earnedDate: new Date().toISOString() }
          : badge
      )
    )
  }

  const handleBadgeProgress = (badgeId: string, newProgress: number) => {
    setBadges(prev => 
      prev.map(badge => 
        badge.id === badgeId 
          ? { ...badge, progress: Math.min(newProgress, badge.totalRequired || 1) }
          : badge
      )
    )
  }

  const filteredBadges = badges.filter(badge => {
    switch (filter) {
      case 'earned':
        return badge.isEarned
      case 'available':
        return !badge.isEarned && badge.progress === badge.totalRequired
      default:
        return true
    }
  })

  const earnedBadges = badges.filter(badge => badge.isEarned)
  const totalDosh = earnedBadges.reduce((sum, badge) => sum + badge.doshReward, 0)

  // Update badges with deadline status
  const badgesWithDeadlineStatus = badges.map(badge => {
    const config = mockBadgeConfigs[badge.id]
    return DeadlineUtils.updateBadgeWithDeadlineStatus(badge, config?.deadline)
  })


  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserStats 
          totalDosh={totalDosh}

          badgesEarned={earnedBadges.length}
          totalBadges={badges.length}
        />

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Your Badges</h1>
          
          <div className="flex space-x-2">
            {(['all', 'earned', 'available'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterType
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border'
                }`}
              >
                {filterType === 'all' ? 'All Badges' : 
                 filterType === 'earned' ? 'Earned' : 'Available to Claim'}
              </button>
            ))}
          </div>
        </div>

        {filteredBadges.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No badges found
            </h3>
            <p className="text-gray-600">
              {filter === 'earned' 
                ? 'You haven\'t earned any badges yet. Keep working towards your goals!'
                : filter === 'available'
                ? 'No badges are ready to claim right now. Keep making progress!'
                : 'No badges available.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBadges.map((badge) => {
              const badgeWithDeadlineStatus = badgesWithDeadlineStatus.find(b => b.id === badge.id) || badge
              return (
                <BadgeCard
                  key={badge.id}
                  badge={badgeWithDeadlineStatus}
                  config={mockBadgeConfigs[badge.id]}
                  onClaim={handleClaimBadge}
                  onClick={() => setSelectedBadge(badgeWithDeadlineStatus)}
                />
              )
            })}
          </div>
        )}

        {/* Badge Detail Modal */}
        {selectedBadge && (
          <BadgeDetailView
            badge={selectedBadge}
            config={mockBadgeConfigs[selectedBadge.id]}
            onClose={() => setSelectedBadge(null)}
            onProgress={handleBadgeProgress}
          />
        )}
      </main>
    </div>
  )
}
