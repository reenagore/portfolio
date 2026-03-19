import api from "./api";

export const submitBooking = async (payload) => {
  const { data } = await api.post("/bookings", payload);
  return data;
};

export const getAdminBookings = async (params = {}) => {
  const { data } = await api.get("/bookings/admin/all", { params });
  return data;
};

export const getAdminBookingById = async (id) => {
  const { data } = await api.get(`/bookings/admin/${id}`);
  return data;
};

export const updateBookingStatus = async (id, payload) => {
  const { data } = await api.patch(`/bookings/admin/${id}`, payload);
  return data;
};