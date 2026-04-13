import { createContext, useContext, useEffect, useState } from "react";
import {
  adminLogin as loginRequest,
  getCurrentAdmin,
} from "../services/admin.service";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setAdmin(null);
        setAuthLoading(false);
        return;
      }

      try {
        const res = await getCurrentAdmin();
        setAdmin(res.data);
      } catch (error) {
        localStorage.removeItem("adminToken");
        setAdmin(null);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (payload) => {
    const res = await loginRequest(payload);

    const token = res?.data?.token;
    const adminData = res?.data?.admin;

    if (!token) {
      throw new Error("Admin token not returned from login");
    }

    localStorage.setItem("adminToken", token);
    setAdmin(adminData);

    return res;
  };

  const logout = async () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        setAdmin,
        authLoading,
        isAuthenticated: !!admin,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);