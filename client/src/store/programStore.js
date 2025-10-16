import { create } from "zustand";
import api from "../api/api";

// Helper to safely extract program arrays
const extractPrograms = (res) => {
  console.log("Programs API response:", res.data); // 👀 debug log

  if (Array.isArray(res.data)) return res.data; // case: [ {...}, {...} ]
  if (Array.isArray(res.data?.data)) return res.data.data; // case: { data: [ ... ] }
  return []; // fallback if no programs found
};

export const useProgramStore = create((set) => ({
  programs: [],
  loading: false,
  error: null,

  fetchPrograms: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/programs");
      set({ programs: extractPrograms(res), loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch programs",
        loading: false,
      });
    }
  },

  createProgram: async (programData) => {
    set({ loading: true, error: null });
    try {
      await api.post("/programs", programData);
      const res = await api.get("/programs");
      set({ programs: extractPrograms(res), loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create program",
        loading: false,
      });
      throw error;
    }
  },

  updateProgram: async (id, programData) => {
    set({ loading: true, error: null });
    try {
      await api.put(`/programs/${id}`, programData);
      const res = await api.get("/programs");
      set({ programs: extractPrograms(res), loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update program",
        loading: false,
      });
      throw error;
    }
  },

  deleteProgram: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/programs/${id}`);
      const res = await api.get("/programs");
      set({ programs: extractPrograms(res), loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete program",
        loading: false,
      });
      throw error;
    }
  },
}));
