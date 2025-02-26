import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBackendRes, IModelPaginate, ITask } from "../../types/backend";

export const taskApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  reducerPath: "tasksApi",
  tagTypes: ["Tasks"],
  endpoints: (build) => ({
    getTasks: build.query<IBackendRes<IModelPaginate<ITask>>, any>({
      query: (query: string) => `/tasks?${query}`,
      providesTags: ["Tasks"],
    }),
    createTask: build.mutation<ITask, Partial<ITask>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation } = taskApi;
