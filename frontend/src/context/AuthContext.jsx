import { createContext, useContext, useEffect, useState } from "react";
import {
  adminLogin as loginRequest,
  adminLogout as logoutRequest,
  getCurrentAdmin,
} from "../services/admin.service";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getCurrentAdmin();
        setAdmin(res.data);
      } catch (error) {
        setAdmin(null);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (payload) => {
    const res = await loginRequest(payload);
    setAdmin(res.data.admin);
    return res;
  };

  const logout = async () => {
    await logoutRequest();
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