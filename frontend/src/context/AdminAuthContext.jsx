import { useEffect, useState } from "react";
import { getCurrentAdmin, loginAdmin, logoutAdmin } from "../services/admin.service";
import { AdminAuthContext } from "./adminAuth.context";

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAdmin = async () => {
    try {
      const res = await getCurrentAdmin();
      setAdmin(res?.data?.admin || null);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmin();
  }, []);

  const login = async (payload) => {
    const res = await loginAdmin(payload);
    setAdmin(res?.data?.admin || null);
    return res;
  };

  const logout = async () => {
    await logoutAdmin();
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
        refreshAdmin: loadAdmin,
        isAuthenticated: Boolean(admin),
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
