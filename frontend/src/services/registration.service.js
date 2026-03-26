import api from "./api";

export const submitProgramRegistration = async (payload) => {
  const { data } = await api.post("/program-registrations", payload);
  return data;
};

export const getAdminProgramRegistrations = async (params = {}) => {
  const { data } = await api.get("/program-registrations/admin/all", { params });
  return data;
};

export const getAdminProgramRegistrationById = async (id) => {
  const { data } = await api.get(`/program-registrations/admin/${id}`);
  return data;
};

export const updateProgramRegistrationStatus = async (id, payload) => {
  const { data } = await api.patch(`/program-registrations/admin/${id}`, payload);
  return data;
};