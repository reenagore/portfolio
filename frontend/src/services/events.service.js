import api from "./api";

export const getPublicEvents = async (params = {}) => {
  const { data } = await api.get("/events", { params });
  return data;
};

export const getPublicEventBySlug = async (slug) => {
  const { data } = await api.get(`/events/${slug}`);
  return data;
};

export const getAdminEvents = async () => {
  const { data } = await api.get("/events/admin/all");
  return data;
};

export const getAdminEventById = async (id) => {
  const { data } = await api.get(`/events/admin/${id}`);
  return data;
};

export const createEvent = async (payload) => {
  const { data } = await api.post("/events", payload);
  return data;
};

export const updateEvent = async (id, payload) => {
  const { data } = await api.put(`/events/${id}`, payload);
  return data;
};

export const deleteEvent = async (id) => {
  const { data } = await api.delete(`/events/${id}`);
  return data;
};