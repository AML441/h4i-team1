
import { Navigate } from "react-router";
import { useAuth } from "../auth/AuthProvider";

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
    <div className="p-10 text-center">
      <h1 className="text-5xl text-purple-600 mb-4">✔️</h1>
      <h2 className="text-xl font-bold mb-2">Items purchased!</h2>
      <p>Thanks for shopping Flutter Box.</p>
      <a href="/catalogue" className="text-purple-500 mt-4 block">
        Back to products
      </a>
    </div>
  );
}
