export enum AppRoutes {
  HOME = 'products',
  PRODUCTS = 'products',
}

export interface ErrorResponse {
  error: {
    message: string;
    type: string;
    traceId: string;
    details?: string[];
  };
}
