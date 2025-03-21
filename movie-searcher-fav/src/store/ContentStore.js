import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
export const useContentStore = create((set) => ({
  contentType: "movie",
  setContentType: (type) => set({ contentType: type }),
}));
