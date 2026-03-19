import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getCurrentAdmin,
  loginAdmin,
  logoutAdmin,
} from "../services/admin.service";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentAdmin = async () => {
    try {
      const data = await getCurrentAdmin();
      setAdmin(data.admin || data);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentAdmin();
  }, []);

  const login = async (payload) => {
    const data = await loginAdmin(payload);
    setAdmin(data.admin || data);
    return data;
  };

  const logout = async () => {
    await logoutAdmin();
    setAdmin(null);
  };

  const value = useMemo(
    () => ({
      admin,
      loading,
      isAuthenticated: !!admin,
      login,
      logout,
      refreshAdmin: fetchCurrentAdmin,
    }),
    [admin, loading]
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  }

  return context;
}