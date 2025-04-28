
import { Navigate } from "react-router";
import { useAuth } from "../auth/AuthProvider";
import Navbar from "../components/Navbar";

export default function ClientCartCheckedOut() {
  // Check for client/vendor status
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role !== "client") {
    return <Navigate to="*" />;
  }

  return (
    <>
    <Navbar />
    <div className="p-10 text-center mt-40">
      <h1 className="text-5xl text-purple-600 mb-4">✔️</h1>
      <h2 className="text-xl font-abel mb-2">Items purchased!</h2>
      <p className="font-abel">Thanks for shopping Flutter Box.</p>
      <a href="/catalogue" className="text-purple-500 mt-4 block font-abel">
        Back to products
      </a>
    </div>
    </>
  );
}
