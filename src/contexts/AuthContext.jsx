import { getMe, logout as logoutApi } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const queryClient = useQueryClient();

  // Check if token exists on mount
  useEffect(() => {
    const token = Cookies.get("portfolio_token");
    if (!token) {
      setUser(null);
      setAuthInitialized(true);
    }
  }, []);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
    enabled: !!Cookies.get("portfolio_token"), // Only run if token exists
    onError: () => {
      setUser(null);
      Cookies.remove("portfolio_token"); // Clear invalid token
      setAuthInitialized(true);
    },
  });

  useEffect(() => {
    if (data?.success) setUser(data.user);
    if (isSuccess || isError) setAuthInitialized(true);
  }, [data, isSuccess, isError]);

  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
      queryClient.clear();
      toast.success("Logged out successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      return { success: true };
    } catch (error) {
      // Still remove token on frontend even if backend logout fails
      Cookies.remove("portfolio_token");
      setUser(null);
      queryClient.clear();

      toast.error(error.response?.data?.message || "Logout failed", {
        position: "top-right",
        autoClose: 5000,
      });

      return {
        success: false,
        message: error.response?.data?.message || "Logout failed",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, isLoading: !authInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
