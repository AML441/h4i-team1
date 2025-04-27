import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

// just for now, can delete these when you connect to firebase
const products = {
  figurines: [
    "Dreamy Series Figurine",
    "Skyline Series Figurine",
    "Cloudy Series Figurine",
    "Sunny Series Figurine",
    "Dawn Series Figurine",
  ],
  plushes: [
    "Dreamy Series Plushie",
    "Skyline Series Plushie",
    "Cloudy Series Plushie",
    "Sunny Series Plushie",
    "Dawn Series Plushie",
  ],
};

export default function ClientProductCatalogue() {
  // Check for client/vendor status
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role !== "client") {
    return <Navigate to="*" />;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center px-5 font-abel mt-10">
        <div className="flex flex-col items-center w-full">
          <div className="flex w-full justify-center gap-150 mb-10">
            <h2 className="text-5xl font-light my-6">PRODUCTS</h2>
            <h2 className="text-5xl font-light my-6">PRODUCTS</h2>
          </div>

          <div>
            <h3 className="text-xl font-abel mx-5 mt-5">Figurines</h3>
            <div className="flex flex-wrap">
              {products.figurines.map((name) => (
                <ProductCard key={name} name={name} vendor={false} />
              ))}
            </div>
          </div>

          <div className="m-10">
            <h3 className="text-xl font-abel mx-5 mt-5">Plushes</h3>
            <div className="flex flex-wrap">
              {products.plushes.map((name) => (
                <ProductCard key={name} name={name} vendor={false} />
              ))}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="bg-[#CF93EB] hover:bg-[#8330AA] text-white font-bold py-2 px-4 rounded h-12 self-center"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
