import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/useAdminAuth";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to access the admin dashboard.
        </p>

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 px-5 py-3 text-white"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}
