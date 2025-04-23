import { useNavigate } from "react-router";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const cartItems = [
  { productId: "dreamy-series", name: "Dreamy Series Figurine", price: 25 },
  { productId: "cloudy-series", name: "Cloudy Series Figurine", price: 25 }
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
      console.error("Checkout failed:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🛒 Your Cart</h1>

      <div className="max-w-lg mx-auto bg-purple-100 p-6 rounded-lg shadow">
        {cartItems.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-3 mb-3 bg-white rounded shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-200 rounded-md" />
              <span className="text-gray-700">{item.name}</span>
            </div>
            <span className="text-gray-800 font-medium">${item.price}</span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-lg font-semibold">Total: ${total.toFixed(2)}</p>

      <button
        onClick={handleCheckout}
        className="text-purple-600 hover:underline mt-3"
      >
        Checkout and Purchase
      </button>
    </div>
  );
}
