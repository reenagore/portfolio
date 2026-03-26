import api from "./api";

export const createBookPreorder = async (payload) => {
  const { data } = await api.post("/book-preorders", payload);
  return data;
};

export const getAdminBookPreorders = async () => {
  const { data } = await api.get("/book-preorders/admin/all");
  return data;
};

export const updateBookPreorderStatus = async (id, payload) => {
  const { data } = await api.patch(`/book-preorders/admin/${id}`, payload);
  return data;
};