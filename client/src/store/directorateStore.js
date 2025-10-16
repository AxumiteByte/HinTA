// src/store/directorateStore.js
import create from "zustand";
import api from "../api/api.js";
import toast from "react-hot-toast";

export const useDirectorateStore = create((set) => ({
  directors: [],
  loading: false,
  error: null,

  fetchDirectors: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/directorate");
      set({ directors: res.data.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch directors", loading: false });
      toast.error("Failed to fetch directors");
    }
  },

  createDirector: async (data) => {
    set({ loading: true });
    try {
      await api.post("/directorate", data);
      set({ loading: false });
      toast.success("Director added successfully");
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to add director");
    }
  },

  updateDirector: async (id, data) => {
    set({ loading: true });
    try {
      await api.put(`/directorate/${id}`, data);
      set({ loading: false });
      toast.success("Director updated successfully");
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to update director");
    }
  },

  deleteDirector: async (id) => {
    set({ loading: true });
    try {
      await api.delete(`/directorate/${id}`);
      set({ loading: false });
      toast.success("Director deleted successfully");
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to delete director");
    }
  },
}));
