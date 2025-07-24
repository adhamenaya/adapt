import React, { useState, useEffect } from 'react';
import './index.css';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { TaskTable } from './components/tasks/TaskTable';
import { TaskDetail } from './components/tasks/TaskDetail';
import { Analytics } from './components/analytics/Analytics';
import { Settings } from './components/settings/Settings';
import { useAppStore } from './store/appStore';
import { mockTasks, mockMetrics, mockUsers } from './data/mockData';
import { Task } from './types';
import { Toaster } from 'react-hot-toast';

type ViewType = 'dashboard' | 'tasks' | 'analytics' | 'settings';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const { 
    setTasks, 
    setMetrics, 
    setUser, 
    setLoading,
    tasks,
    metrics,
    user 
  } = useAppStore();

  // Initialize app data
  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTasks(mockTasks);
      setMetrics(mockMetrics);
      setUser(mockUsers[0]); // Set current user as John Smith
      
      setLoading(false);
    };

    initializeApp();
  }, [setTasks, setMetrics, setUser, setLoading]);

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    // In a real app, this would make an API call
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setSelectedTask(updatedTask);
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            metrics={metrics}
            recentTasks={tasks.slice(0, 5)}
            onTaskSelect={handleTaskSelect}
          />
        );
      case 'tasks':
        return (
          <TaskTable 
            tasks={tasks}
            onTaskSelect={handleTaskSelect}
            onTaskUpdate={handleTaskUpdate}
          />
        );
      case 'analytics':
        return <Analytics metrics={metrics} tasks={tasks} />;
      case 'settings':
        return <Settings user={user} />;
      default:
        return <Dashboard metrics={metrics} recentTasks={tasks.slice(0, 5)} />;
    }
  };

  return (
    <div className="min-h-screen bg-enterprise-gray-50 flex">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'white',
            color: '#374151',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          },
        }}
      />
      
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        currentView={currentView}
        onViewChange={setCurrentView}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'ml-64' : 'ml-16'
      }`}>
        {/* Header */}
        <Header
          user={user}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex">
            {/* Primary Content */}
            <div className={`flex-1 overflow-auto ${selectedTask ? 'mr-96' : ''}`}>
              <div className="p-6">
                {renderMainContent()}
              </div>
            </div>

            {/* Task Detail Sidebar */}
            {selectedTask && (
              <div className="w-96 border-l border-enterprise-gray-200 bg-white overflow-auto">
                <TaskDetail
                  task={selectedTask}
                  onUpdate={handleTaskUpdate}
                  onClose={() => setSelectedTask(null)}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;