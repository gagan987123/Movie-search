import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  signup: async (credentials, navigate) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        credentials
      );
      set({ user: response.data.user, isSigningUp: false });

      toast.success("Account created success ");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message || "An error occured");
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials, navigate) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        credentials
      );

      set({ user: response.data.user, isLoggingIn: false });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response?.data?.message || "Login failed");
    }
  },

  logout: async (navigate) => {
    set({ isLoggingOut: true });
    try {
      await axios.post("http://localhost:3000/logout");
      set({ user: null, isLoggingOut: false });
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      set({ isLoggingOut: false });
      console.log(error);
      toast.error(error.response.data.message || "Logout failed");
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("http://localhost:3000/authCheck", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },
}));
