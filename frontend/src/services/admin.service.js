import api from "./api";

export const loginAdmin = async (payload) => {
  const { data } = await api.post("/admin/login", payload);
  return data;
};

export const getCurrentAdmin = async () => {
  const { data } = await api.get("/admin/me");
  return data;
};

export const logoutAdmin = async () => {
  const { data } = await api.post("/admin/logout");
  return data;
};

export const getAllAdmins = async () => {
  const { data } = await api.get("/admin");
  return data;
};



export const adminLogin = async (payload) => {
  const { data } = await api.post("/admin/login", payload);
  return data;
};

