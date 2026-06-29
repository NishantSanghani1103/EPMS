export interface ApiResponse<T = any> {
  message: string;
  code: number;
  status: boolean;
  data?: T;
  error?: T;
  [key: string]: any;
}
