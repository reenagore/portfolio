import api from "./api";

export const submitContact = async (payload) => {
  const { data } = await api.post("/contacts", payload);
  return data;
};