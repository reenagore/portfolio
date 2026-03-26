import api from "./api";

export const getPublicGalleries = async (params = {}) => {
  const { data } = await api.get("/galleries", { params });
  return data;
};

export const getPublicGalleryBySlug = async (slug) => {
  const { data } = await api.get(`/galleries/${slug}`);
  return data;
};

export const getAdminGalleries = async () => {
  const { data } = await api.get("/galleries/admin/all");
  return data;
};

export const getAdminGalleryById = async (id) => {
  const { data } = await api.get(`/galleries/admin/${id}`);
  return data;
};

export const createGallery = async (payload) => {
  const { data } = await api.post("/galleries", payload);
  return data;
};

export const updateGallery = async (id, payload) => {
  const { data } = await api.put(`/galleries/${id}`, payload);
  return data;
};

export const deleteGallery = async (id) => {
  const { data } = await api.delete(`/galleries/${id}`);
  return data;
};