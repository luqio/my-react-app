// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  code: number;
  message?: string;
  status?: string;
  data: T;
}
