import api from "./api";

export const submitContactForm = async (formData) => {
  try {
    const response = await api.post("/contact", formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};

// Add other contact-related service functions here