import { useNavigate } from "react-router";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import cartIcon from "../assets/cart.png";
import homeIcon from "../assets/home.png";
import userIcon from "../assets/user.png";
import logo from "../assets/logo.png";
import Navbar from "../components/Navbar";

const cartItems = [
  { productId: "dreamy-series", name: "Dreamy Series Figurine", price: 25 },
  { productId: "cloudy-series", name: "Cloudy Series Figurine", price: 25 },
  { productId: "dawn-series", name: "Dawn Series Figurine", price: 25 },
];

export default function ClientCart() {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        await addDoc(collection(db, "orders"), {
          productId: item.productId,
          quantity: 1,
        });
      }
      navigate("/checked-out");
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Cart Items */}
      <div className="max-w-xl mx-auto bg-purple-100 p-6 mt-25 rounded-lg shadow">
        {cartItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-white p-4 mb-4 rounded shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-200 rounded" />
              <span className="text-gray-800">{item.name}</span>
            </div>
            <span className="text-gray-700">${item.price}</span>
          </div>
        ))}
      </div>

      {/* Total & Checkout */}
      <div className="text-center mt-8">
        <p className="text-lg font-medium mb-2">Total: ${total.toFixed(2)}</p>
        <button
          onClick={handleCheckout}
          className="text-purple-600 hover:underline"
        >
          Checkout and Purchase
        </button>
      </div>
    </div>
  );
}
