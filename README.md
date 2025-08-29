# Badges Prototype

A modern badge system with customer-facing frontend and administrative dashboard for configuring and managing user rewards.

## Features

### Customer-Facing Frontend
- **Badge Display**: View all available and earned badges
- **Progress Tracking**: Real-time progress bars for habitual badges
- **Mini Badges**: Milestone rewards for long-term goals
- **Reward System**: Dosh and XP rewards for completed badges
- **Filtering**: Filter badges by status (all, earned, available to claim)

### Administrative Dashboard
- **Badge Creation**: Create badges with various action types
- **Badge Management**: Edit and delete existing badges
- **Configuration Options**:
  - Webhook integration for external events
  - Evidence upload with AI analysis
  - Tool usage tracking
  - Code entry for event attendance
  - Event attendance tracking
- **Analytics**: View statistics and badge performance

## Badge Types

### Action Types
1. **Webhook**: Triggered by external API calls (e.g., loan payment completion)
2. **Evidence Upload**: Users submit content for AI analysis
3. **Tool Usage**: Track usage of financial tools (budgeting calculator, savings tracker)
4. **Code Entry**: Users enter unique codes from events or activities
5. **Event Attendance**: Track participation in events or activities

### Badge Categories
- **One-off**: Single completion badges
- **Habitual**: Recurring badges (daily, weekly, monthly)
- **Mini Badges**: Milestone rewards for progress tracking

## Technology Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel-ready configuration

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Deployment to Vercel

This project is configured for Vercel deployment with:
- Static export configuration
- Optimized build settings
- Responsive design for all devices

Simply connect your repository to Vercel and deploy!

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Admin dashboard
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Customer frontend
├── components/            # Reusable components
│   ├── BadgeCard.tsx     # Customer badge display
│   ├── BadgeForm.tsx     # Admin badge creation/editing
│   ├── DashboardBadgeCard.tsx # Admin badge display
│   ├── Navigation.tsx    # Navigation component
│   └── UserStats.tsx     # User statistics display
├── data/                 # Mock data
│   └── mockBadges.ts     # Sample badges and configurations
├── types/                # TypeScript definitions
│   └── badge.ts          # Badge type definitions
└── ...                   # Configuration files
```

## Customization

- **Colors**: Modify `tailwind.config.js` for brand colors
- **Badge Icons**: Use any emoji or icon system
- **Rewards**: Customize Dosh and XP values
- **Action Types**: Extend badge action types as needed

## License

This is a prototype project for demonstration purposes.
