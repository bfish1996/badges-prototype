'use client'

import { LessonRequirement } from '@/types/badge'
import { CheckCircle, Clock, BookOpen, Timer } from 'lucide-react'

interface LessonProgressProps {
  lessons: LessonRequirement[]
  completionOrder: 'any' | 'sequential'
  category?: string
}

export default function LessonProgress({ lessons, completionOrder, category }: LessonProgressProps) {
  const completedLessons = lessons.filter(lesson => lesson.isCompleted).length
  const totalLessons = lessons.length
  const progressPercentage = (completedLessons / totalLessons) * 100

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50'
      case 'intermediate': return 'text-yellow-600 bg-yellow-50'
      case 'advanced': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '🟢'
      case 'intermediate': return '🟡'
      case 'advanced': return '🔴'
      default: return '⚪'
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700 flex items-center space-x-2">
          <BookOpen className="w-4 h-4" />
          <span>Required Lessons</span>
        </h4>
        <div className="text-xs text-gray-500">
          {completionOrder === 'sequential' ? 'Complete in order' : 'Any order'}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">{completedLessons}/{totalLessons} completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {lessons.map((lesson, index) => (
          <div 
            key={lesson.id}
            className={`flex items-start space-x-3 p-3 rounded-lg border ${
              lesson.isCompleted 
                ? 'bg-green-50 border-green-200' 
                : completionOrder === 'sequential' && index > 0 && !lessons[index - 1].isCompleted
                ? 'bg-gray-50 border-gray-200 opacity-60'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {lesson.isCompleted ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h5 className={`text-sm font-medium ${
                  lesson.isCompleted ? 'text-green-800' : 'text-gray-900'
                }`}>
                  {lesson.name}
                </h5>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    getDifficultyColor(lesson.difficulty || 'beginner')
                  }`}>
                    {getDifficultyIcon(lesson.difficulty || 'beginner')} {lesson.difficulty}
                  </span>
                </div>
              </div>
              
              <p className={`text-xs ${
                lesson.isCompleted ? 'text-green-600' : 'text-gray-600'
              } mb-2`}>
                {lesson.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{lesson.category}</span>
                  </span>
                  {lesson.estimatedDuration && (
                    <span className="flex items-center space-x-1">
                      <Timer className="w-3 h-3" />
                      <span>{lesson.estimatedDuration}min</span>
                    </span>
                  )}
                </div>
                
                {lesson.isCompleted && lesson.completedDate && (
                  <span className="text-xs text-green-600">
                    ✓ {new Date(lesson.completedDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {category && (
        <div className="text-xs text-gray-500 text-center py-2 border-t">
          Category: {category}
        </div>
      )}
    </div>
  )
}
