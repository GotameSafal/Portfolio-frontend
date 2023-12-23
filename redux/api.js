import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  }),
  tagTypes: ["details"],
  endpoints: (builder) => ({
    createDetails: builder.mutation({
      query: (body) => ({
        url: "/api/details",
        method: "POST",
        body,
      }),
      invalidatesTags: ["details"],
    }),
    getDetails: builder.query({
      query: () => "/api/details",
      providesTags: ["details"],
    }),
    createBanner: builder.mutation({
      query: (body) => ({ url: "/api/banner", method: "POST", body }),
      invalidatesTags: ["details"],
    }),
    addContacts: builder.mutation({
      query: (body) => ({ url: "/api/contacts", method: "POST", body }),
      invalidatesTags: ["details"],
    }),
    deleteContacts: builder.mutation({
      query: (id) => ({ url: `/api/contacts/${id}`, method: "DELETE" }),
      invalidatesTags: ["details"],
    }),
    addProject: builder.mutation({
      query: (body) => ({ url: "/api/project", method: "POST", body }),
      invalidatesTags: ["details"],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({ url: `/api/project/${id}`, method: "DELETE" }),
      invalidatesTags: ["details"],
    }),
    updateSkills: builder.mutation({
      query: (body) => {
        console.log(body);
        return { url: "/api/skills", method: "PUT", body };
      },
      invalidatesTags: ["details"],
    }),
    updateSelfIntro: builder.mutation({
      query: (body) => {
        console.log(body);
        return { url: "/api/about", method: "PUT", body };
      },
      invalidatesTags: ["details"],
    }),
    login: builder.mutation({
      query: (body) => ({ url: "/api/login", method: "POST", body }),
    }),
    logout: builder.query({
      query: () => "/api/logout",
    }),
  }),
});
export const {
  useCreateDetailsMutation,
  useGetDetailsQuery,
  useCreateBannerMutation,
  useAddContactsMutation,
  useAddProjectMutation,
  useUpdateSkillsMutation,
  useUpdateSelfIntroMutation,
  useDeleteProjectMutation,
  useDeleteContactsMutation,
  useLazyLogoutQuery,
  useLoginMutation,
} = api;
