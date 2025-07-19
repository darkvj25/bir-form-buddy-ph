import { useState, useEffect } from 'react';
import { BIRTask, TaskStatus, TaskFrequency } from '@/types';

const STORAGE_KEY = 'bir_tasks';

// Default BIR forms for initial data
const defaultTasks: Omit<BIRTask, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    formName: 'Annual Income Tax Return',
    formNumber: '1701',
    description: 'Individual income tax return',
    deadline: '2025-04-15',
    frequency: 'annually',
    status: 'not-started'
  },
  {
    formName: 'Quarterly Income Tax Return',
    formNumber: '2551Q',
    description: 'Corporate quarterly income tax',
    deadline: '2025-01-31',
    frequency: 'quarterly',
    status: 'not-started'
  },
  {
    formName: 'Monthly Withholding Tax Return',
    formNumber: '1601-C',
    description: 'Creditable withholding tax',
    deadline: '2025-01-20',
    frequency: 'monthly',
    status: 'not-started'
  }
];

export const useBIRTasks = () => {
  const [tasks, setTasks] = useState<BIRTask[]>([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Initialize with default tasks
      const initialTasks = defaultTasks.map(task => ({
        ...task,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      setTasks(initialTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<BIRTask, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: BIRTask = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<BIRTask>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    updateTask(id, { status });
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus
  };
};