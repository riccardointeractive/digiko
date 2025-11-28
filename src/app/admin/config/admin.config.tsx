import { ToolCategory, QuickAction, QuickLink } from '../types/admin.types';

/**
 * Admin Configuration
 * All admin tools, quick actions, and links
 */

const tools: ToolCategory[] = [
    {
      category: 'Design & Development',
      items: [
        {
          id: 'design-system',
          title: 'Design System',
          description: 'Interactive reference for colors, typography, components, and animations',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          ),
          href: '/design-system',
          status: 'active',
          badge: 'Live',
          badgeColor: 'green',
        },
        {
          id: 'project-rules',
          title: 'Project Rules',
          description: 'Development workflow rules and guidelines for Claude AI integration',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          href: '/admin/project-rules',
          status: 'active',
          badge: 'Live',
          badgeColor: 'green',
        },
      ],
    },
    {
      category: 'Analytics & Monitoring',
      items: [
        {
          id: 'analytics',
          title: 'Analytics Dashboard',
          description: 'User metrics, transaction volume, and platform statistics',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
          href: '#',
          status: 'coming',
          badge: 'Coming Soon',
          badgeColor: 'blue',
        },
        {
          id: 'logs',
          title: 'System Logs',
          description: 'Real-time logs, error tracking, and system health monitoring',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          href: '#',
          status: 'coming',
          badge: 'Coming Soon',
          badgeColor: 'blue',
        },
      ],
    },
    {
      category: 'Content Management',
      items: [
        {
          id: 'announcements',
          title: 'Announcements',
          description: 'Create and manage platform announcements and notifications',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          ),
          href: '#',
          status: 'coming',
          badge: 'Coming Soon',
          badgeColor: 'blue',
        },
        {
          id: 'docs',
          title: 'Documentation Editor',
          description: 'Edit documentation pages and guides directly from admin panel',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          ),
          href: '#',
          status: 'coming',
          badge: 'Coming Soon',
          badgeColor: 'blue',
        },
      ],
    },
    {
      category: 'Blockchain Management',
      items: [
        {
          id: 'contracts',
          title: 'Smart Contracts',
          description: 'Monitor and manage staking contracts, swap pools, and treasury',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ),
          href: '#',
          status: 'coming',
          badge: 'Coming Soon',
          badgeColor: 'blue',
        },
        {
          id: 'transactions',
          title: 'Transaction Manager',
          description: 'View all platform transactions, pending operations, and history',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          ),
          href: '#',
          status: 'coming',
          badge: 'Coming Soon',
          badgeColor: 'blue',
        },
      ],
    },
    {
      category: 'User Management',
      items: [
        {
          id: 'users',
          title: 'User Directory',
          description: 'Browse active users, wallet addresses, and activity metrics',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ),
          href: '#',
          status: 'coming',
          badge: 'Coming Soon',
          badgeColor: 'blue',
        },
      ],
    },
  ];

// Quick actions
const quickActions: QuickAction[] = [
  {
    title: 'View Logs',
    description: 'Check system logs',
    icon: '📋',
    action: () => alert('Logs feature coming soon'),
  },
  {
    title: 'Clear Cache',
    description: 'Clear application cache',
    icon: '🗑️',
    action: () => alert('Cache cleared! (Demo)'),
  },
  {
    title: 'Deploy Status',
    description: 'Check deployment status',
    icon: '🚀',
    action: () => alert('Deploy feature coming soon'),
  },
];

// Useful links
const quickLinks: QuickLink[] = [
  { title: 'Documentation', url: '/documentation' },
  { title: 'Updates', url: '/updates' },
  { title: 'GitHub Repo', url: 'https://github.com/yourusername/digiko-web3-app' },
  { title: 'Klever Docs', url: 'https://docs.klever.org' },
];

export { tools, quickActions, quickLinks };
