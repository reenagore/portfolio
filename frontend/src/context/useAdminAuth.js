import { useContext } from "react";
import { AdminAuthContext } from "./adminAuth.context";

export const useAdminAuth = () => useContext(AdminAuthContext);
