import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBackendRes, IModelPaginate, IProject } from "../../types/backend";

export const projectApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  reducerPath: "projectsApi",
  tagTypes: ["Projects"],
  endpoints: (build) => ({
    getProjects: build.query<IBackendRes<IModelPaginate<IProject[]>>, any>({
      query: (query: string) => `/projects?${query}`,
      providesTags: ["Projects"],
    }),
    createProject: build.mutation<IProject, Partial<IProject>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const { useGetProjectsQuery, useCreateProjectMutation } = projectApi;
