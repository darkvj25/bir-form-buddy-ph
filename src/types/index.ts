export type TaskStatus = 'not-started' | 'in-progress' | 'completed';

export type TaskFrequency = 'monthly' | 'quarterly' | 'annually';

export interface BIRTask {
  id: string;
  formName: string;
  formNumber: string;
  description?: string;
  deadline: string;
  frequency: TaskFrequency;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilter {
  status?: TaskStatus;
  frequency?: TaskFrequency;
}

export type SortOption = 'deadline' | 'formNumber' | 'status' | 'createdAt';