export interface ApiResponse {
  code: string;
  message: string;
  // Expected success response
  data: string[]
}

export type RequestStatus = 'init' | 'loading' | 'success'| 'failed';
