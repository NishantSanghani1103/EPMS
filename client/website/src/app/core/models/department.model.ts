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
}
