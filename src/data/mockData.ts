import { Task, DashboardMetrics, User, SavedView, AIAnalysis, EmailThread, FollowUpConfig } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'manager',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    preferences: {
      defaultView: 'active-tasks',
      notificationSettings: {
        email: true,
        push: true,
        frequency: 'immediate'
      },
      dashboardLayout: ['metrics', 'recent-tasks', 'overdue'],
      timezone: 'America/New_York'
    },
    lastActive: new Date()
  },
  {
    id: '2',
    name: 'Sarah Connor',
    email: 'sarah.connor@company.com',
    role: 'admin',
    department: 'Operations',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    preferences: {
      defaultView: 'all-tasks',
      notificationSettings: {
        email: true,
        push: false,
        frequency: 'daily'
      },
      dashboardLayout: ['metrics', 'team-performance'],
      timezone: 'America/Los_Angeles'
    },
    lastActive: new Date(Date.now() - 3600000) // 1 hour ago
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'user',
    department: 'Finance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    preferences: {
      defaultView: 'my-tasks',
      notificationSettings: {
        email: true,
        push: true,
        frequency: 'weekly'
      },
      dashboardLayout: ['my-metrics', 'deadlines'],
      timezone: 'Asia/Shanghai'
    },
    lastActive: new Date(Date.now() - 7200000) // 2 hours ago
  }
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: 'task-001',
    title: 'Q4 Financial Report Review',
    description: 'Review and approve the quarterly financial statements before board meeting',
    assignee: 'Michael Chen',
    assigneeEmail: 'michael.chen@company.com',
    priority: 'high',
    status: 'pending',
    dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
    createdAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
    updatedAt: new Date(Date.now() - 3600000), // 1 hour ago
    emailThreadId: 'thread-001',
    category: 'Finance',
    tags: ['quarterly', 'board-meeting', 'urgent'],
    estimatedHours: 8,
    actualHours: 0
  },
  {
    id: 'task-002',
    title: 'API Documentation Update',
    description: 'Update REST API documentation for new authentication endpoints',
    assignee: 'John Smith',
    assigneeEmail: 'john.smith@company.com',
    priority: 'medium',
    status: 'in-progress',
    dueDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
    createdAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
    updatedAt: new Date(Date.now() - 1800000), // 30 minutes ago
    emailThreadId: 'thread-002',
    category: 'Engineering',
    tags: ['documentation', 'api', 'authentication'],
    estimatedHours: 6,
    actualHours: 3
  },
  {
    id: 'task-003',
    title: 'Security Audit Preparation',
    description: 'Prepare documentation and access credentials for upcoming security audit',
    assignee: 'Sarah Connor',
    assigneeEmail: 'sarah.connor@company.com',
    priority: 'high',
    status: 'overdue',
    dueDate: new Date(Date.now() - 86400000), // 1 day overdue
    createdAt: new Date(Date.now() - 86400000 * 14), // 14 days ago
    updatedAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    emailThreadId: 'thread-003',
    category: 'Security',
    tags: ['audit', 'compliance', 'security'],
    estimatedHours: 12,
    actualHours: 8,
    blockerReason: 'Waiting for legal team approval on document sharing'
  },
  {
    id: 'task-004',
    title: 'Database Migration Planning',
    description: 'Plan and schedule the migration from MySQL to PostgreSQL',
    assignee: 'John Smith',
    assigneeEmail: 'john.smith@company.com',
    priority: 'medium',
    status: 'completed',
    dueDate: new Date(Date.now() - 86400000 * 3), // 3 days ago
    createdAt: new Date(Date.now() - 86400000 * 21), // 21 days ago
    updatedAt: new Date(Date.now() - 86400000 * 1), // 1 day ago
    emailThreadId: 'thread-004',
    category: 'Engineering',
    tags: ['database', 'migration', 'postgresql'],
    estimatedHours: 16,
    actualHours: 18,
    completionNotes: 'Migration plan approved by DevOps team. Implementation scheduled for next sprint.'
  },
  {
    id: 'task-005',
    title: 'Employee Training Materials',
    description: 'Create onboarding materials for new customer support agents',
    assignee: 'Sarah Connor',
    assigneeEmail: 'sarah.connor@company.com',
    priority: 'low',
    status: 'pending',
    dueDate: new Date(Date.now() + 86400000 * 10), // 10 days from now
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    emailThreadId: 'thread-005',
    category: 'HR',
    tags: ['training', 'onboarding', 'support'],
    estimatedHours: 10,
    actualHours: 0
  },
  {
    id: 'task-006',
    title: 'Client Presentation Deck',
    description: 'Prepare Q1 results presentation for Acme Corp client meeting',
    assignee: 'Michael Chen',
    assigneeEmail: 'michael.chen@company.com',
    priority: 'high',
    status: 'blocked',
    dueDate: new Date(Date.now() + 86400000), // Tomorrow
    createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
    updatedAt: new Date(Date.now() - 3600000 * 4), // 4 hours ago
    emailThreadId: 'thread-006',
    category: 'Sales',
    tags: ['presentation', 'client', 'q1-results'],
    estimatedHours: 4,
    actualHours: 2,
    blockerReason: 'Waiting for updated revenue figures from accounting'
  }
];

// Mock Dashboard Metrics
export const mockMetrics: DashboardMetrics = {
  totalActiveTasks: 42,
  tasksByStatus: {
    'pending': 15,
    'in-progress': 18,
    'blocked': 4,
    'completed': 89,
    'overdue': 5
  },
  tasksByPriority: {
    'high': 12,
    'medium': 23,
    'low': 7
  },
  tasksByAssignee: [
    { assignee: 'John Smith', count: 8, onTime: 6, overdue: 2 },
    { assignee: 'Sarah Connor', count: 12, onTime: 10, overdue: 2 },
    { assignee: 'Michael Chen', count: 6, onTime: 5, overdue: 1 },
    { assignee: 'Alice Johnson', count: 9, onTime: 9, overdue: 0 },
    { assignee: 'Bob Wilson', count: 7, onTime: 7, overdue: 0 }
  ],
  averageResponseTime: 2.3, // days
  completionRate: 87.5, // percentage
  overdueRate: 12.5, // percentage
  trendsData: [
    { date: '2024-01-01', completed: 8, created: 12, overdue: 2 },
    { date: '2024-01-02', completed: 6, created: 9, overdue: 1 },
    { date: '2024-01-03', completed: 11, created: 15, overdue: 3 },
    { date: '2024-01-04', completed: 9, created: 8, overdue: 1 },
    { date: '2024-01-05', completed: 13, created: 14, overdue: 2 },
    { date: '2024-01-06', completed: 7, created: 6, overdue: 0 },
    { date: '2024-01-07', completed: 10, created: 11, overdue: 1 }
  ]
};

// Mock Saved Views
export const mockSavedViews: SavedView[] = [
  {
    id: 'view-001',
    name: 'High Priority Tasks',
    description: 'All high priority tasks across departments',
    filter: {
      priority: ['high']
    },
    sortConfig: {
      field: 'dueDate',
      direction: 'asc'
    },
    isDefault: false,
    createdBy: 'sarah.connor@company.com',
    createdAt: new Date(Date.now() - 86400000 * 30)
  },
  {
    id: 'view-002',
    name: 'Engineering Tasks',
    description: 'All tasks assigned to engineering team',
    filter: {
      category: ['Engineering']
    },
    sortConfig: {
      field: 'updatedAt',
      direction: 'desc'
    },
    isDefault: false,
    createdBy: 'john.smith@company.com',
    createdAt: new Date(Date.now() - 86400000 * 15)
  },
  {
    id: 'view-003',
    name: 'Overdue Tasks',
    description: 'Tasks that are past their due date',
    filter: {
      overdue: true
    },
    sortConfig: {
      field: 'dueDate',
      direction: 'asc'
    },
    isDefault: false,
    createdBy: 'sarah.connor@company.com',
    createdAt: new Date(Date.now() - 86400000 * 7)
  }
];

// Mock AI Analysis
export const mockAIAnalysis: Record<string, AIAnalysis> = {
  'task-001': {
    taskId: 'task-001',
    confidence: 0.92,
    extractedMetadata: {
      urgency: 'high',
      complexity: 'moderate',
      dependencies: ['accounting-data', 'board-approval'],
      estimatedDuration: '6-8 hours'
    },
    sentimentScore: 0.2, // slightly negative due to urgency
    keyEntities: ['Q4', 'financial report', 'board meeting', 'Michael Chen'],
    suggestedActions: [
      'Set reminder for 24 hours before due date',
      'Escalate if no response within 12 hours',
      'Prepare backup assignee if needed'
    ],
    riskFlags: ['tight-deadline', 'board-critical']
  },
  'task-003': {
    taskId: 'task-003',
    confidence: 0.87,
    extractedMetadata: {
      urgency: 'high',
      complexity: 'complex',
      dependencies: ['legal-team', 'security-team'],
      estimatedDuration: '12-16 hours'
    },
    sentimentScore: -0.4, // negative due to blockers and delays
    keyEntities: ['security audit', 'compliance', 'legal approval'],
    suggestedActions: [
      'Escalate to management immediately',
      'Request status update from legal team',
      'Consider partial completion to unblock progress'
    ],
    riskFlags: ['overdue', 'compliance-critical', 'external-dependency']
  }
};

// Mock Email Threads
export const mockEmailThreads: Record<string, EmailThread> = {
  'thread-001': {
    id: 'thread-001',
    subject: 'Q4 Financial Report - Review Required',
    participants: ['sarah.connor@company.com', 'michael.chen@company.com'],
    messageCount: 3,
    lastMessage: {
      id: 'msg-001-3',
      threadId: 'thread-001',
      from: 'ai-assistant@company.com',
      to: ['michael.chen@company.com'],
      subject: 'Reminder: Q4 Financial Report Review',
      body: 'Hi Michael, This is a reminder that the Q4 financial report review is due in 2 days. Please let us know if you need any assistance or have questions about the requirements.',
      timestamp: new Date(Date.now() - 3600000),
      isAIGenerated: true,
      sentiment: 'neutral',
      actionItems: ['Review financial statements', 'Approve for board meeting']
    },
    createdAt: new Date(Date.now() - 86400000 * 3),
    updatedAt: new Date(Date.now() - 3600000),
    status: 'active'
  },
  'thread-003': {
    id: 'thread-003',
    subject: 'Security Audit Preparation - URGENT',
    participants: ['john.smith@company.com', 'sarah.connor@company.com', 'legal@company.com'],
    messageCount: 8,
    lastMessage: {
      id: 'msg-003-8',
      threadId: 'thread-003',
      from: 'sarah.connor@company.com',
      to: ['legal@company.com'],
      cc: ['john.smith@company.com'],
      subject: 'Re: Security Audit Preparation - URGENT',
      body: 'Legal team, we need urgent approval for document sharing with the security auditors. This task is now overdue and blocking our compliance timeline.',
      timestamp: new Date(Date.now() - 86400000 * 2),
      isAIGenerated: false,
      sentiment: 'negative',
      actionItems: ['Get legal approval', 'Prepare audit documentation']
    },
    createdAt: new Date(Date.now() - 86400000 * 14),
    updatedAt: new Date(Date.now() - 86400000 * 2),
    status: 'active'
  }
};

// Mock Follow-up Configurations
export const mockFollowUpConfigs: Record<string, FollowUpConfig> = {
  'task-001': {
    taskId: 'task-001',
    enabled: true,
    cadence: 'daily',
    escalationRules: [
      {
        afterDays: 1,
        action: 'notify-manager',
        targetEmails: ['sarah.connor@company.com']
      },
      {
        afterDays: 2,
        action: 'mark-overdue'
      }
    ],
    maxReminders: 5,
    currentReminderCount: 2
  },
  'task-003': {
    taskId: 'task-003',
    enabled: true,
    cadence: 'every-3-days',
    escalationRules: [
      {
        afterDays: 7,
        action: 'notify-manager',
        targetEmails: ['john.smith@company.com']
      }
    ],
    maxReminders: 10,
    currentReminderCount: 5
  }
};

// Mock API delay function for realistic loading states
export const mockApiDelay = (ms: number = 800) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Helper functions for filtering and sorting
export const filterTasks = (tasks: Task[], filter: any) => {
  return tasks.filter(task => {
    if (filter.assignee && filter.assignee.length > 0 && !filter.assignee.includes(task.assignee)) {
      return false;
    }
    if (filter.status && filter.status.length > 0 && !filter.status.includes(task.status)) {
      return false;
    }
    if (filter.priority && filter.priority.length > 0 && !filter.priority.includes(task.priority)) {
      return false;
    }
    if (filter.category && filter.category.length > 0 && !filter.category.includes(task.category)) {
      return false;
    }
    if (filter.overdue && task.status !== 'overdue') {
      return false;
    }
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      const searchableText = `${task.title} ${task.description} ${task.assignee} ${task.category}`.toLowerCase();
      if (!searchableText.includes(query)) {
        return false;
      }
    }
    return true;
  });
};