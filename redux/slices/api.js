import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      let token = getState().configUser.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["projects", "skills"],
  endpoints: (builder) => ({
    getLoggedInUserDetails: builder.query({
      query: () => "/api/my-info",
    }),
    doLogin: builder.mutation({
      query: (body) => ({
        url: "/api/login",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/api/projects/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["projects"],
    }),
    getProjects: builder.query({
      query: () => "/api/projects",
      providesTags: ["projects"],
    }),
    addProject: builder.mutation({
      query: (body) => ({
        url: "/api/projects",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["projects"],
    }),
    updateProjects: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/projects/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["projects"],
    }),
    addSkill: builder.mutation({
      query: (body) => ({
        url: "/api/skills",
        body,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["skills"],
    }),
    getSkills: builder.query({
      query: () => "/api/skills",
      providesTags: ["skills"],
    }),
    deleteSkill: builder.mutation({
      query: (body) => ({
        url: "/api/skills",
        method: "DELETE",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["skills"],
    }),
    updateSkill: builder.mutation({
      query: (body) => ({
        url: "/api/skills",
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["skills"],
    }),
  }),
});
export const {
  useDoLoginMutation,
  useLazyGetLoggedInUserDetailsQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
  useGetProjectsQuery,
  useUpdateProjectsMutation,
  useAddSkillMutation,
  useGetSkillsQuery,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = api;
