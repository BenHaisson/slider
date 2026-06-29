import { CardItem } from './types';

export const cardsData: CardItem[] = [
  {
    id: 'live-pricing',
    label: 'Live Pricing',
    description: 'Real-time, low-latency market data feed spanning over 150 global exchanges. Includes institutional-grade bid/ask spreads and instant order-book depth updates.',
    iconName: 'Radio',
    previewText: 'Launch Real-time Terminal',
  },
  {
    id: 'analyst-estimates',
    label: 'Analyst Estimates',
    description: 'Consensus expectations compiled from leading Wall Street research desks. Tracks EPS forecasts, revenue targets, and buy/sell rating shifts in real time.',
    iconName: 'TrendingUp',
    previewText: 'View Consensus Models',
  },
  {
    id: 'company-financials',
    label: 'Company Financials',
    description: 'Standardized balance sheets, income statements, and cash flow reports. Explore historic 10-K and 10-Q filings with complete SEC interactive disclosure mapping.',
    iconName: 'Building2',
    previewText: 'Open Financial Statements',
  },
  {
    id: 'peer-analysis',
    label: 'Peer Analysis',
    description: 'Compare key performance metrics, valuations, and multiples against sector peers. Instantly generate custom cohorts and competitive landscape matrices.',
    iconName: 'Users',
    previewText: 'Generate Peer Cohort',
  },
  {
    id: 'historical-earnings',
    label: 'Historical Earnings',
    description: 'Comprehensive review of past quarterly earnings surprises, transcript summaries, and historical post-earnings stock volatility analysis.',
    iconName: 'History',
    previewText: 'View Earnings History',
  },
  {
    id: 'insider-transactions',
    label: 'Insider Transactions',
    description: 'Monitor Form 4 filings from C-suite executives and 10% owners. Detect high-conviction buying patterns and planned thematic selling schedules.',
    iconName: 'Link',
    previewText: 'Inspect Insider Registry',
  },
  {
    id: 'email-updates',
    label: 'Email Updates',
    description: 'Subscribe to custom alerts. Receive instant push notifications and daily briefs covering regulatory filings, price breakouts, and critical news events.',
    iconName: 'Mail',
    previewText: 'Configure Alert Rules',
  },
];
