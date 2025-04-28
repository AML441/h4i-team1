import { Link, Navigate } from "react-router";
import { useAuth } from "../auth/AuthProvider";
import Navbar from "../components/Navbar";
import confirmation from "../assets/confirmation.png";

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
      <div className="p-10 text-center flex flex-col items-center">
        <img
          src={confirmation}
          alt="Confirmation Check"
          className="object-contain scale-60 mt-20"
        />
        <h2 className="text-3xl font-bold mb-2 text-[#8330AA] font-abel">
          Items purchased!
        </h2>
        <p className="font-abel text-[#8330AA]">
          Thanks for shopping Flutter Box.
        </p>
        <Link
          to="/"
          className="text-lg text-[#8330AA] font-abel underline cursor-pointer select-none mt-10"
        >
          Back to products
        </Link>
      </div>

    </>
  );
}
