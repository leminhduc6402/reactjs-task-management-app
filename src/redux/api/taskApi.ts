import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBackendRes, IModelPaginate, ITask } from "../../types/backend";

export const taskApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "tasksApi",
  tagTypes: ["Tasks"],
  endpoints: (build) => ({
    getTasks: build.query<IBackendRes<IModelPaginate<ITask>>, any>({
      query: (query) => `tasks?${query}`,
      providesTags: ["Tasks"],
    }),
    updateTaskStatus: build.mutation<
      IBackendRes<ITask>,
      { taskId: string; status: string }
    >({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Tasks"],
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

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
} = taskApi;
