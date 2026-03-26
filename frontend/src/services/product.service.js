import api from "./api";

export const getPublicProducts = async (params = {}) => {
  const { data } = await api.get("/products", { params });
  return data;
};

export const getPublicProductBySlug = async (slug) => {
  const { data } = await api.get(`/products/${slug}`);
  return data;
};

export const getAdminProducts = async () => {
  const { data } = await api.get("/products/admin/all");
  return data;
};

export const getAdminProductById = async (id) => {
  const { data } = await api.get(`/products/admin/${id}`);
  return data;
};

export const createProduct = async (payload) => {
  const { data } = await api.post("/products", payload);
  return data;
};

export const updateProduct = async (id, payload) => {
  const { data } = await api.put(`/products/${id}`, payload);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};