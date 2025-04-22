import { signOut, User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import VendorNavbar from "../components/VendorNavbar";
import { FaPlus } from "react-icons/fa";
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

const AddCard = () => (
  <div className="w-30 h-40 border-2 border-purple-300 rounded-lg flex items-center justify-center m-5 text-purple-400 hover:bg-purple-100 transition font-abel">
    <FaPlus size={30} />
  </div>
);

export default function VendorProductCatalogue() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <VendorNavbar />
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
                <ProductCard key={name} name={name} vendor={true} />
              ))}
              <AddCard />
            </div>
          </div>

          <div className="m-10">
            <h3 className="text-xl font-abel mx-5 mt-5">Plushes</h3>
            <div className="flex flex-wrap">
              {products.plushes.map((name) => (
                <ProductCard key={name} name={name} vendor={true}/>
              ))}
              <AddCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
