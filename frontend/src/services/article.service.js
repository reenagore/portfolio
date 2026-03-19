import api from "./api";

export const getPublicArticles = async (params = {}) => {
  const { data } = await api.get("/articles", { params });
  return data;
};

export const getAdminArticles = async (params = {}) => {
  const { data } = await api.get("/articles/admin/all", { params });
  return data;
};

export const getAdminArticleById = async (id) => {
  const { data } = await api.get(`/articles/admin/${id}`);
  return data;
};

export const createArticle = async (formData) => {
  const { data } = await api.post("/articles", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateArticle = async (id, formData) => {
  const { data } = await api.put(`/articles/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteArticle = async (id) => {
  const { data } = await api.delete(`/articles/${id}`);
  return data;
};