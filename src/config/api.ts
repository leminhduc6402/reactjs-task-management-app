import { IBackendRes, IModelPaginate, IProject } from "../types/backend";
import axiosClient from "../config/axios-customize";

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
  const res = await axiosClient.get<IBackendRes<IModelPaginate<IProject>>>(
    `/projects?${query}`
  );
  return res;
};
