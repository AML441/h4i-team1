import { useNavigate } from "react-router";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import cartIcon from "../assets/cart.png";
import homeIcon from "../assets/home.png";
import userIcon from "../assets/user.png";
import logo from "../assets/logo.png";

const cartItems = [
  { productId: "dreamy-series", name: "Dreamy Series Figurine", price: 25 },
  { productId: "cloudy-series", name: "Cloudy Series Figurine", price: 25 },
  { productId: "dawn-series", name: "Dawn Series Figurine", price: 25 }
];

export default function ClientCart() {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        await addDoc(collection(db, "orders"), {
          productId: item.productId,
          quantity: 1
        });
      }
      navigate("/checked-out");
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="bg-purple-300 p-4 flex justify-between items-center">
        <span className="text-purple-900 font-medium">Welcome, User1!</span>
        <div className="flex gap-4">
          <img src={userIcon} alt="User" className="w-6 h-6" />
          <img src={cartIcon} alt="Cart" className="w-6 h-6" />
          <img src={homeIcon} alt="Home" className="w-6 h-6" />
        </div>
      </div>

      {/* Header */}
      <div className="text-center mt-8">
        <h1 className="text-5xl font-light tracking-widest">CART</h1>
        <img src={logo} alt="Flutter Box Logo" className="mx-auto mt-4 w-20 h-20" />
      </div>

      {/* Cart Items */}
      <div className="max-w-xl mx-auto bg-purple-100 p-6 mt-8 rounded-lg shadow">
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
