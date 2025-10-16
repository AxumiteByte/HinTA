import { create } from "zustand";
import api from "../api/api";

export const useNewsStore = create((set) => ({
  news: [],
  loading: false,
  error: null,

  fetchNews: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/news");
      console.log("Fetched news from API:", res.data); 
      set({ news: res.data.data, loading: false }); // <-- important
    } catch (error) {
      console.log("Fetch error:", error);
      set({
        error: error.response?.data?.message || "Failed to fetch news",
        loading: false,
      });
    }
  },

  createNews: async (newsData) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/news", newsData);
      set((state) => ({
        news: [res.data.data, ...state.news],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create news",
        loading: false,
      });
      throw error;
    }
  },

  updateNews: async (id, newsData) => {
    set({ loading: true, error: null });
    try {
      const res = await api.put(`/news/${id}`, newsData);
      set((state) => ({
        news: state.news.map((item) =>
          item._id === id ? res.data.data : item
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update news",
        loading: false,
      });
      throw error;
    }
  },

  deleteNews: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/news/${id}`);
      set((state) => ({
        news: state.news.filter((item) => item._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete news",
        loading: false,
      });
      throw error;
    }
  },
}));
