export interface IResponse {
  success: boolean;
  status: number;
  message?: string;
  user?: any;
  token?: string;
  data?: object;
}
