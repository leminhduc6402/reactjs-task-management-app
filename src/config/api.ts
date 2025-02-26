import {
  IAccount,
  IBackendRes,
  IModelPaginate,
  IProject,
  ITask,
  IUpdateStatusTask,
} from "../types/backend";
import axiosClient from "../config/axios-customize";

//Module Auth
export const callLogin = async (email: string, password: string) => {
  const response = await axiosClient.post<IBackendRes<IAccount>>(
    "/auth/login",
    {
      email,
      password,
    }
  );
  return response;
};

export const callRefreshToken = () => {
  return axiosClient.get<IBackendRes<IAccount>>("auth/refresh");
};

export const callLogout = () => {
  return axiosClient.post<IBackendRes<string>>("auth/logout");
};

// Module Project
export const callCreateProject = (
  name: string,
  description: string,
  startDate: Date,
  endDate: Date
) => {
  return axiosClient.post("projects", {
    name,
    description,
    startDate,
    endDate,
  });
};
export const callFetchProject = async (query: string) => {
  const res = await axiosClient.get<IModelPaginate<IProject>>(
    `/projects?${query}`
  );
  return res;
};

// Module Task
export const callFetchTask = async (query: string) => {
  return await axiosClient.get<IModelPaginate<ITask>>(`/tasks?${query}`);
};

export const callUpdateStatusTask = async (taskId: string, status: string) => {
  return await axiosClient.patch<IBackendRes<IUpdateStatusTask>>(
    `/tasks/${taskId}/status`,
    { status }
  );
};
