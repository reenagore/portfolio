import api from "./api";

export const getPublicPodcasts = async (params = {}) => {
  const { data } = await api.get("/podcasts", { params });
  return data;
};

export const getAdminPodcasts = async (params = {}) => {
  const { data } = await api.get("/podcasts/admin/all", { params });
  return data;
};

export const getAdminPodcastById = async (id) => {
  const { data } = await api.get(`/podcasts/admin/${id}`);
  return data;
};

export const createPodcast = async (formData) => {
  const { data } = await api.post("/podcasts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updatePodcast = async (id, formData) => {
  const { data } = await api.put(`/podcasts/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deletePodcast = async (id) => {
  const { data } = await api.delete(`/podcasts/${id}`);
  return data;
};