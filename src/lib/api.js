import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const API_URL = "https://sdev-backend.vercel.app/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add request interceptor to include auth token in headers
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("portfolio_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Projects API
export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

export const createProject = async (projectData) => {
  const formData = new FormData();

  // Append text fields
  Object.keys(projectData).forEach((key) => {
    if (key === "technologies") {
      formData.append(key, JSON.stringify(projectData[key]));
    } else if (key !== "file") {
      formData.append(key, projectData[key]);
    }
  });

  // Append file if exists
  if (projectData.file) {
    formData.append("file", projectData.file);
  }

  const response = await api.post("/projects", formData);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete project");
    },
  });
};

// Workplaces API
export const getWorkplaces = async () => {
  const response = await api.get("/workplaces");
  return response.data;
};

export const createWorkplace = async (workplaceData) => {
  const formData = new FormData();

  // Append text fields
  Object.keys(workplaceData).forEach((key) => {
    if (key === "responsibilities" || key === "technologies") {
      formData.append(key, JSON.stringify(workplaceData[key]));
    } else if (key !== "file" && key !== "files") {
      formData.append(key, workplaceData[key]);
    }
  });

  // Append single file if exists
  if (workplaceData.file) {
    formData.append("file", workplaceData.file);
  }

  const response = await api.post("/workplaces", formData);
  return response.data;
};

export const createWorkplaceWithImages = async (workplaceData) => {
  const formData = new FormData();

  // Append text fields
  Object.keys(workplaceData).forEach((key) => {
    if (key === "responsibilities" || key === "technologies") {
      formData.append(key, JSON.stringify(workplaceData[key]));
    } else if (key !== "file" && key !== "files") {
      formData.append(key, workplaceData[key]);
    }
  });

  // Append multiple files if exist
  if (workplaceData.files && workplaceData.files.length > 0) {
    workplaceData.files.forEach((file) => {
      formData.append("files", file);
    });
  }

  const response = await api.post("/workplaces/with-images", formData);
  return response.data;
};

export const deleteWorkplace = async (id) => {
  const response = await api.delete(`/workplaces/${id}`);
  return response.data;
};

export const useDeleteWorkplace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWorkplace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workplaces"] });
      toast.success("Workplace deleted successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete workplace"
      );
    },
  });
};

// Auth API

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (userData) => {
      const response = await api.post("/login", userData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },

    onSuccess: (data) => {
      if (data?.success) {
        toast.success("Login successful");
        Cookies.set("portfolio_token", data.token, {
          expires: 1, // 1 day
        });
      }

      // Update React Query cache
      queryClient.setQueryData(["auth"], {
        token: data.token,
        user: data.user,
      });
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
};

export const logout = async () => {
  const response = await api.get("/logout");

  // Remove token from cookies
  Cookies.remove("portfolio_token");

  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/me");
  return response.data;
};

export const sendContactEmail = async (formData) => {
  try {
    const response = await api.post("/sendmail", formData);
    return response.data;
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error(
      error.response?.data?.message ||
        "Failed to send message. Please try again later."
    );
  }
};
