interface departmentRes {
  status: boolean;
  message: string;
  data: Dept[];
}
interface Dept {
  id: string;
  name: string;
  description: string;
  userId: string | null;
  createdAt: string;
  users: User[];
}
interface User {
  profileImageUrl: string | null;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  departmentId: string;
  profileImage: string | null;
  status: string;
  createdAt: string; // ISO date string
  updatedAt: string;
}
