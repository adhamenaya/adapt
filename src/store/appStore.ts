import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AppState, AppActions, Task, DashboardMetrics, User, TaskFilter, SavedView } from '../types';

interface AppStore extends AppState, AppActions {}

export const useAppStore = create<AppStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      user: null,
      tasks: [],
      selectedTasks: [],
      currentFilter: {},
      currentView: null,
      metrics: null,
      loading: false,
      error: null,

      // Actions
      setUser: (user: User | null) =>
        set({ user }, false, 'setUser'),

      setTasks: (tasks: Task[]) =>
        set({ tasks }, false, 'setTasks'),

      addTask: (task: Task) =>
        set(
          (state) => ({ tasks: [...state.tasks, task] }),
          false,
          'addTask'
        ),

      updateTask: (taskId: string, updates: Partial<Task>) =>
        set(
          (state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId ? { ...task, ...updates, updatedAt: new Date() } : task
            ),
          }),
          false,
          'updateTask'
        ),

      removeTask: (taskId: string) =>
        set(
          (state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId),
            selectedTasks: state.selectedTasks.filter((id) => id !== taskId),
          }),
          false,
          'removeTask'
        ),

      setSelectedTasks: (taskIds: string[]) =>
        set({ selectedTasks: taskIds }, false, 'setSelectedTasks'),

      setFilter: (filter: TaskFilter) =>
        set({ currentFilter: filter }, false, 'setFilter'),

      setCurrentView: (view: SavedView | null) =>
        set({ currentView: view }, false, 'setCurrentView'),

      setMetrics: (metrics: DashboardMetrics | null) =>
        set({ metrics }, false, 'setMetrics'),

      setLoading: (loading: boolean) =>
        set({ loading }, false, 'setLoading'),

      setError: (error: string | null) =>
        set({ error }, false, 'setError'),
    }),
    {
      name: 'app-store',
    }
  )
);

// Computed selectors
export const useFilteredTasks = () => {
  const tasks = useAppStore((state) => state.tasks);
  const filter = useAppStore((state) => state.currentFilter);

  return tasks.filter((task) => {
    // Filter by assignee
    if (filter.assignee && filter.assignee.length > 0) {
      if (!filter.assignee.includes(task.assignee)) return false;
    }

    // Filter by status
    if (filter.status && filter.status.length > 0) {
      if (!filter.status.includes(task.status)) return false;
    }

    // Filter by priority
    if (filter.priority && filter.priority.length > 0) {
      if (!filter.priority.includes(task.priority)) return false;
    }

    // Filter by category
    if (filter.category && filter.category.length > 0) {
      if (!filter.category.includes(task.category)) return false;
    }

    // Filter by overdue
    if (filter.overdue) {
      if (task.status !== 'overdue') return false;
    }

    // Filter by date range
    if (filter.dateRange) {
      const taskDate = new Date(task.dueDate);
      if (taskDate < filter.dateRange.start || taskDate > filter.dateRange.end) {
        return false;
      }
    }

    // Filter by tags
    if (filter.tags && filter.tags.length > 0) {
      const hasMatchingTag = filter.tags.some(tag => 
        task.tags.some(taskTag => 
          taskTag.toLowerCase().includes(tag.toLowerCase())
        )
      );
      if (!hasMatchingTag) return false;
    }

    // Filter by search query
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      const searchableText = [
        task.title,
        task.description,
        task.assignee,
        task.category,
        ...task.tags
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(query)) return false;
    }

    return true;
  });
};

// Task statistics selectors
export const useTaskStats = () => {
  const tasks = useFilteredTasks();

  return {
    total: tasks.length,
    byStatus: tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byPriority: tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    overdue: tasks.filter(task => task.status === 'overdue').length,
    dueToday: tasks.filter(task => {
      const today = new Date();
      const taskDue = new Date(task.dueDate);
      return (
        taskDue.getDate() === today.getDate() &&
        taskDue.getMonth() === today.getMonth() &&
        taskDue.getFullYear() === today.getFullYear()
      );
    }).length,
    dueTomorrow: tasks.filter(task => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const taskDue = new Date(task.dueDate);
      return (
        taskDue.getDate() === tomorrow.getDate() &&
        taskDue.getMonth() === tomorrow.getMonth() &&
        taskDue.getFullYear() === tomorrow.getFullYear()
      );
    }).length,
  };
};

// Recent activity selector
export const useRecentActivity = () => {
  const tasks = useAppStore((state) => state.tasks);

  return tasks
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 10);
};

// High priority tasks selector
export const useHighPriorityTasks = () => {
  const tasks = useAppStore((state) => state.tasks);

  return tasks
    .filter(task => task.priority === 'high' && task.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
};

// Overdue tasks selector
export const useOverdueTasks = () => {
  const tasks = useAppStore((state) => state.tasks);

  return tasks
    .filter(task => task.status === 'overdue')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
};