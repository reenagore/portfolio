import api from "./api";

export const initializePayment = async (payload) => {
  const { data } = await api.post("/payments/initialize", payload);
  return data;
};

export const verifyPayment = async (reference) => {
  const { data } = await api.get(`/payments/verify/${reference}`);
  return data;
};

export const getAdminPayments = async (params = {}) => {
  const { data } = await api.get("/payments/admin/all", { params });
  return data;
};

export const getAdminPaymentById = async (id) => {
  const { data } = await api.get(`/payments/admin/${id}`);
  return data;
};