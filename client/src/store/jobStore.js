import { create } from "zustand";
import api from "../api/api";

export const useJobStore = create((set) => ({
  jobs: [],
  loading: false,
  error: null,

  fetchActiveJobs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/jobs/active");
      set({ jobs: res.data.data || res.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch jobs", loading: false });
    }
  },

  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/jobs");
      set({ jobs: res.data.data || res.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch jobs", loading: false });
    }
  },

  createJob: async (jobData) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/jobs", jobData);
      set((state) => ({ jobs: [res.data.data, ...state.jobs], loading: false }));
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to create job", loading: false });
      throw err;
    }
  },

  updateJob: async (id, jobData) => {
    set({ loading: true, error: null });
    try {
      const res = await api.put(`/jobs/${id}`, jobData);
      set((state) => ({
        jobs: state.jobs.map((job) => (job._id === id ? res.data.data : job)),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to update job", loading: false });
      throw err;
    }
  },

  deleteJob: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/jobs/${id}`);
      set((state) => ({ jobs: state.jobs.filter((job) => job._id !== id), loading: false }));
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to delete job", loading: false });
      throw err;
    }
  },
}));
