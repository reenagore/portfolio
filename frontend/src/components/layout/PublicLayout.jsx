import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
;

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}