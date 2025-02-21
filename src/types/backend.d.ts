export interface IBackendRes<T> {
  error?: string | string[];
  message: string;
  statusCode: number | string;
  data?: T;
}

export interface IModelPaginate<T> {
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  results: T[];
}

export interface IAccount {
  access_token: string;
  isAuthenticated?: boolean;
  user: IUser;
}

export interface IProject {
  _id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  createdBy?: IUser;
  isDeleted?: boolean;
  deletedAt?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}
