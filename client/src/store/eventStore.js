import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/events"
    : "/api/events";

axios.defaults.withCredentials = true;

export const useEventStore = create((set) => ({
  events: [],
  loading: false,
  error: null,

  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(API_URL);
      set({ events: res.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch events",
        loading: false,
      });
    }
  },

  createEvent: async (eventData) => {
    set({ loading: true, error: null });
    try {
      await axios.post(API_URL, eventData);
      const res = await axios.get(API_URL);
      set({ events: res.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create event",
        loading: false,
      });
      throw error;
    }
  },

  updateEvent: async (id, eventData) => {
    set({ loading: true, error: null });
    try {
      await axios.put(`${API_URL}/${id}`, eventData);
      const res = await axios.get(API_URL);
      set({ events: res.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update event",
        loading: false,
      });
      throw error;
    }
  },

  deleteEvent: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`);
      const res = await axios.get(API_URL);
      set({ events: res.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete event",
        loading: false,
      });
      throw error;
    }
  },
}));
