import { useNavigate } from "react-router";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function ClientCart() {
  const navigate = useNavigate();

  const cartItems = [
    { productId: "dreamy-series-figurine", quantity: 1 },
    { productId: "cloudy-sweet-figurine", quantity: 1 }
  ];

  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        await addDoc(collection(db, "orders"), item); // Firestore write here
      }
      navigate("/checked-out");
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Your cart UI here */}
      <button
        onClick={handleCheckout}
        className="bg-purple-500 text-white px-4 py-2 rounded"
      >
        Checkout and Purchase
      </button>
    </div>
  );
}
