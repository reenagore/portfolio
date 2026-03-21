import api from "./api";

export const getPublicLandingPages = async (params = {}) => {
  const { data } = await api.get("/landing-pages", { params });
  return data;
};

export const getPublicLandingPageBySlug = async (slug) => {
  const { data } = await api.get(`/landing-pages/${slug}`);
  return data;
};

export const getAdminLandingPages = async (params = {}) => {
  const { data } = await api.get("/landing-pages/admin/all", { params });
  return data;
};

export const getAdminLandingPageById = async (id) => {
  const { data } = await api.get(`/landing-pages/admin/${id}`);
  return data;
};

export const createLandingPage = async (payload) => {
  const { data } = await api.post("/landing-pages", payload);
  return data;
};

export const updateLandingPage = async (id, payload) => {
  const { data } = await api.put(`/landing-pages/${id}`, payload);
  return data;
};

export const deleteLandingPage = async (id) => {
  const { data } = await api.delete(`/landing-pages/${id}`);
  return data;
};