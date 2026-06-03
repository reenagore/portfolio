import api from "./api";

export const getPublicArticles = async (params = {}) => {
  const { data } = await api.get("/articles", { params });
  return data;
};

export const getPublicArticleBySlug = async (slug) => {
  const { data } = await api.get(`/articles/${slug}`);
  return data;
};

export const getAdminArticles = async () => {
  const { data } = await api.get("/articles/admin/all");
  return data;
};

export const getAdminArticleById = async (id) => {
  const { data } = await api.get(`/articles/admin/${id}`);
  return data;
};

export const createArticle = async (payload) => {
  const { data } = await api.post("/articles", payload);
  return data;
};

export const updateArticle = async (id, payload) => {
  const { data } = await api.put(`/articles/${id}`, payload);
  return data;
};

export const deleteArticle = async (id) => {
  const { data } = await api.delete(`/articles/${id}`);
  return data;
};