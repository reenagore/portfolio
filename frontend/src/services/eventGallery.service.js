import api from "./api";

export const getPublicEventGalleries = async () => {
  const { data } = await api.get("/event-galleries");
  return data;
};

export const getPublicEventGalleryBySlug = async (slug) => {
  const { data } = await api.get(`/event-galleries/${slug}`);
  return data;
};

export const getAdminEventGalleries = async () => {
  const { data } = await api.get("/event-galleries/admin/all");
  return data;
};

export const getAdminEventGalleryById = async (id) => {
  const { data } = await api.get(`/event-galleries/admin/${id}`);
  return data;
};

export const createEventGallery = async (payload) => {
  const { data } = await api.post("/event-galleries", payload);
  return data;
};

export const updateEventGallery = async (id, payload) => {
  const { data } = await api.put(`/event-galleries/${id}`, payload);
  return data;
};

export const deleteEventGallery = async (id) => {
  const { data } = await api.delete(`/event-galleries/${id}`);
  return data;
};