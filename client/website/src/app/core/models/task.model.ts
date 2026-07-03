export interface taskType {
  id: string;
  projectId: string;
  assignedTo: string;
  createdBy: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'completed';
  startDate: string;
  dueDate: string;
  estimatedHours: string;
  actualHours: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  user: TaskUser;
  taskCreated: TaskCreator;
  project: TaskProject;
}

export interface TaskUser {
  profileImageUrl: string | null;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
}

export interface TaskCreator {
  profileImageUrl: string | null;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
}

export interface TaskProject {
  name: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  startDate: string;
  endDate: string;
}