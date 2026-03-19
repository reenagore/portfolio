import { Outlet } from "react-router-dom";
import AdminHeader from "../common/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-indigo-50/50">
      {/* AdminHeader now contains both the mobile header and desktop sidebar */}
      <AdminHeader />
      
      {/* Main content area - positioned to the right of the sidebar on desktop */}
      <div className="lg:ml-64">
        {/* Top padding to account for mobile header, adjusted for desktop */}
        <main className="min-h-[calc(100vh-4rem)] p-4 lg:p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
        
        {/* Optional footer for admin area */}
        <footer className="border-t border-indigo-100 bg-white/50 py-4 px-4 lg:px-6 lg:ml-0">
          <div className="mx-auto max-w-7xl">
            <p className="text-center text-xs text-indigo-900/40">
              Admin Panel v2.0 • Reena Gore • All rights reserved
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}