export interface ProjectType {
  id: string;
  name: string;
  description: string | null;
  departmentId: string;
  managerId: string;
  startDate: string;
  endDate: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  manager: Manager;
  department: Department;
}

export interface Manager {
  firstName: string;
  lastName: string;
}

export interface Department {
  name: string;
}