# Badges v1 - Baseline Badge System

## Executive Summary

### Problem Statement

We need to implement a comprehensive badge system that motivates users to engage with financial literacy content and complete various financial actions. The system should support multiple types of user actions, different completion cadences, configurable deadlines, and milestone rewards to drive sustained user engagement.

### Goals and Success Metrics

**Primary Goals:**
- Increase user engagement with financial literacy lessons by 40%
- Drive completion of key financial actions (loan payments, budgeting, research)
- Establish a reward system that encourages habitual financial behaviors
- Provide clear progress tracking and milestone recognition

**Success Metrics:**
- Badge completion rate > 60%
- User retention increase of 25% for badge participants
- Average session time increase of 30%
- Milestone completion rate > 70%

## Dependencies and Assumptions

**External Dependencies:**
- Creditspring API for loan payment webhooks
- AI service for evidence analysis and marking
- Lesson completion tracking system
- Dosh reward distribution system

**Key Assumptions:**
- Users are motivated by gamification and rewards
- Milestone rewards increase completion rates
- Deadline pressure drives action completion
- External partners (Creditspring) can provide reliable webhook data

## Requirements

### Functional Requirements

**Core Badge System:**
- Support for one-off and habitual badge types
- Progress tracking with visual indicators
- Deadline management with warnings and extensions
- Milestone reward system with incremental rewards
- Badge completion with Dosh reward distribution

**Action Types:**
- **Lesson Completion**: Complete specific financial literacy lessons
- **Webhook Integration**: Receive external event notifications (loan payments)
- **AI Agent Marking**: Submit evidence for AI analysis and scoring
- **Tool Usage**: Track usage of financial calculators and tools
- **Code Entry**: Enter unique codes from events or activities

**Cadence Support:**
- One-off: Single completion badges
- Daily: Daily habit tracking
- Weekly: Weekly goal completion
- Monthly: Long-term milestone tracking

**Deadline Management:**
- Fixed deadlines with specific end dates
- Rolling deadlines from user start date
- Warning notifications before expiry
- Optional deadline extensions
- Automatic badge expiration

**Milestone Rewards:**
- Auto-generated milestones based on frequency
- Custom milestone configuration
- Incremental Dosh rewards
- Progress-based triggers (count, day, week, percentage)

### Non-Functional Requirements

- System must handle 10,000+ concurrent users
- Badge progress updates must be real-time (< 2 seconds)
- 99.9% uptime for webhook processing
- GDPR compliant data handling
- Mobile-responsive UI components
- Accessible design (WCAG 2.1 AA)

## Technical Overview

### Data Model

**Core Badge Interface:**
```typescript
interface Badge {
  id: string
  name: string
  description: string
  icon: string
  doshReward: number
  type: 'one-off' | 'habitual'
  frequency: 'daily' | 'weekly' | 'monthly' | 'none'
  actionType: 'webhook' | 'evidence-upload' | 'tool-usage' | 'code-entry' | 'lesson-completion'
  progress?: number
  totalRequired?: number
  milestones?: MilestoneReward[]
  deadline?: string
}
```

**Milestone System:**
```typescript
interface MilestoneReward {
  id: string
  name: string
  description: string
  icon: string
  doshReward: number
  triggerAt: number
  triggerType: 'count' | 'day' | 'week' | 'percentage'
  isEarned: boolean
  earnedDate?: string
}
```

**Configuration Objects:**
- `WebhookConfig`: External API integration settings
- `EvidenceConfig`: AI analysis parameters and prompts
- `ToolUsageConfig`: Tool tracking requirements
- `CodeEntryConfig`: Validation patterns and codes
- `LessonConfig`: Required lessons and completion order
- `DeadlineConfig`: Deadline type and warning settings

### Architecture

**Frontend Components:**
- `BadgeCard`: Individual badge display with progress
- `BadgeDetailView`: Detailed badge information and actions
- `MilestoneProgress`: Milestone tracking visualization
- `BadgeForm`: Administrative badge creation/editing

**Data Layer:**
- Mock data providers for development (`mockBadges.ts`)
- Type definitions for all badge-related interfaces
- Utility functions for deadline and progress calculations

**Integration Points:**
- Webhook endpoints for external event processing
- AI service integration for evidence analysis
- Lesson management system integration
- Reward distribution system connection

## Considerations

### Open Questions

1. **Webhook Security**: How do we verify webhook authenticity from external partners?
2. **AI Analysis Accuracy**: What fallback mechanisms exist if AI marking fails?
3. **Deadline Extensions**: Should extensions be automatic or require approval?
4. **Badge Difficulty**: How do we balance challenge with achievability?
5. **Cross-Badge Dependencies**: Should some badges unlock others?

### Proposed Solutions

**Webhook Security:**
- Implement HMAC signature verification
- Use API keys and rate limiting
- Maintain webhook endpoint whitelist

**AI Analysis Reliability:**
- Manual review queue for failed AI analysis
- Confidence scoring with human fallback
- Clear rubrics and scoring criteria

**Deadline Management:**
- Configurable extension policies per badge
- User request system with admin approval
- Automatic extensions for technical issues

**Progressive Difficulty:**
- Badge difficulty ratings (beginner, intermediate, advanced)
- Prerequisite badge system
- Adaptive milestone spacing

### Out of Scope

- Advanced analytics and reporting dashboards
- Social features and leaderboards
- Badge trading or marketplace functionality
- Integration with external learning platforms
- Multi-language support
- Advanced AI prompt customization

## Risks and Mitigations

**Technical Risks:**
- **Webhook Reliability**: External services may have downtime
  - *Mitigation*: Implement retry logic and fallback manual entry
- **AI Service Failures**: Evidence analysis may fail or be inaccurate
  - *Mitigation*: Manual review queue and human oversight
- **Scale Issues**: High user load may impact performance
  - *Mitigation*: Implement caching and database optimization

**Business Risks:**
- **Low Engagement**: Users may not find badges motivating
  - *Mitigation*: A/B testing of reward amounts and milestone spacing
- **Reward Costs**: High completion rates may increase Dosh payouts
  - *Mitigation*: Dynamic reward adjustment and budget controls
- **External Dependencies**: Partner APIs may change or become unavailable
  - *Mitigation*: Flexible configuration system and multiple integration options

**User Experience Risks:**
- **Complexity**: Too many badge types may confuse users
  - *Mitigation*: Clear categorization and progressive disclosure
- **Technical Barriers**: Code entry and evidence upload may be difficult
  - *Mitigation*: Intuitive UI design and clear instructions
- **Deadline Pressure**: Strict deadlines may cause user stress
  - *Mitigation*: Reasonable timeframes and extension options