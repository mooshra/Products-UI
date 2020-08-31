export enum AppRoutes {
  HOME = 'products',
  PRODUCTS = 'products',
}

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface ErrorResponse {
  error: {
    message: string;
    type: string;
    traceId: string;
    details?: string[];
  };
}
