export interface userDataResponse {
  profileImageUrl: string | null;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string | null;
  role: string;
  departmentId: string | null;
  profileImage: string;
  status: string;
  deparmentId: Department;
  createdAt: string;
  updatedAt: string;
}
interface Department {
  name: string;
}
