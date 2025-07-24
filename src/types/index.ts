// Core Task Types
export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  assigneeEmail: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'blocked' | 'completed' | 'overdue';
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  emailThreadId: string;
  category: string;
  tags: string[];
  estimatedHours?: number;
  actualHours?: number;
  blockerReason?: string;
  completionNotes?: string;
}

// AI Analysis Types
export interface AIAnalysis {
  taskId: string;
  confidence: number;
  extractedMetadata: {
    urgency: 'high' | 'medium' | 'low';
    complexity: 'simple' | 'moderate' | 'complex';
    dependencies: string[];
    estimatedDuration: string;
  };
  sentimentScore: number;
  keyEntities: string[];
  suggestedActions: string[];
  riskFlags: string[];
}

// Email Thread Types
export interface EmailThread {
  id: string;
  subject: string;
  participants: string[];
  messageCount: number;
  lastMessage: EmailMessage;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'resolved' | 'archived';
}

export interface EmailMessage {
  id: string;
  threadId: string;
  from: string;
  to: string[];
  cc?: string[];
  subject: string;
  body: string;
  timestamp: Date;
  isAIGenerated: boolean;
  sentiment?: 'positive' | 'neutral' | 'negative';
  actionItems: string[];
}

// Follow-up Configuration
export interface FollowUpConfig {
  taskId: string;
  enabled: boolean;
  cadence: 'daily' | 'every-3-days' | 'weekly' | 'custom';
  customDays?: number;
  escalationRules: EscalationRule[];
  pausedUntil?: Date;
  maxReminders: number;
  currentReminderCount: number;
}

export interface EscalationRule {
  afterDays: number;
  action: 'notify-manager' | 'change-assignee' | 'mark-overdue' | 'custom';
  targetEmails?: string[];
  customMessage?: string;
}

// Dashboard Analytics Types
export interface DashboardMetrics {
  totalActiveTasks: number;
  tasksByStatus: Record<Task['status'], number>;
  tasksByPriority: Record<Task['priority'], number>;
  tasksByAssignee: Array<{
    assignee: string;
    count: number;
    onTime: number;
    overdue: number;
  }>;
  averageResponseTime: number;
  completionRate: number;
  overdueRate: number;
  trendsData: TrendDataPoint[];
}

export interface TrendDataPoint {
  date: string;
  completed: number;
  created: number;
  overdue: number;
}

// Filter and View Types
export interface TaskFilter {
  assignee?: string[];
  status?: Task['status'][];
  priority?: Task['priority'][];
  category?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
  overdue?: boolean;
  searchQuery?: string;
}

export interface SavedView {
  id: string;
  name: string;
  description?: string;
  filter: TaskFilter;
  sortConfig: SortConfig;
  isDefault: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface SortConfig {
  field: keyof Task;
  direction: 'asc' | 'desc';
}

// User and Permission Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  department: string;
  avatar?: string;
  preferences: UserPreferences;
  lastActive: Date;
}

export interface UserPreferences {
  defaultView: string;
  notificationSettings: {
    email: boolean;
    push: boolean;
    frequency: 'immediate' | 'daily' | 'weekly';
  };
  dashboardLayout: string[];
  timezone: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
  meta?: {
    total: number;
    page: number;
    pageSize: number;
    hasNextPage: boolean;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number;
    page: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Component Props Types
export interface TaskTableProps {
  tasks: Task[];
  loading?: boolean;
  onTaskSelect?: (task: Task) => void;
  onTaskUpdate?: (task: Task) => void;
  onBulkAction?: (action: string, taskIds: string[]) => void;
}

export interface TaskDetailProps {
  task: Task;
  aiAnalysis?: AIAnalysis;
  emailThread?: EmailThread;
  followUpConfig?: FollowUpConfig;
  onUpdate?: (task: Task) => void;
  onClose?: () => void;
}

// Store State Types
export interface AppState {
  user: User | null;
  tasks: Task[];
  selectedTasks: string[];
  currentFilter: TaskFilter;
  currentView: SavedView | null;
  metrics: DashboardMetrics | null;
  loading: boolean;
  error: string | null;
}

// Action Types for State Management
export interface AppActions {
  setUser: (user: User | null) => void;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  removeTask: (taskId: string) => void;
  setSelectedTasks: (taskIds: string[]) => void;
  setFilter: (filter: TaskFilter) => void;
  setCurrentView: (view: SavedView | null) => void;
  setMetrics: (metrics: DashboardMetrics) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}