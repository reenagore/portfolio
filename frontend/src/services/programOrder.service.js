
import api from "./api";

export const initiateProgrammeOrder = async (payload) => {
  const { data } = await api.post("/programme-orders/initiate", payload);
  return data;
};

export const verifyProgrammeOrder = async (reference) => {
  const { data } = await api.get("/programme-orders/verify", {
    params: { reference },
  });
  return data;
};

export const getAdminProgrammeOrders = async () => {
  const { data } = await api.get("/programme-orders/admin/all");
  return data;
};