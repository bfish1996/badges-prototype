'use client'

import { Trophy, Coins } from 'lucide-react'

interface UserStatsProps {
  totalDosh: number
  badgesEarned: number
  totalBadges: number
}

export default function UserStats({ totalDosh, badgesEarned, totalBadges }: UserStatsProps) {
  return (
    <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl p-6 text-white mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Your Progress</h2>
          <p className="text-primary-100">Keep earning badges to unlock rewards!</p>
        </div>
        <div className="text-4xl">🎯</div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Coins className="w-6 h-6 mr-2" />
            <span className="text-2xl font-bold">{totalDosh}</span>
          </div>
          <p className="text-primary-100 text-sm">Total Dosh</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Trophy className="w-6 h-6 mr-2" />
            <span className="text-2xl font-bold">{badgesEarned}/{totalBadges}</span>
          </div>
          <p className="text-primary-100 text-sm">Badges Earned</p>
        </div>
      </div>
    </div>
  )
}
