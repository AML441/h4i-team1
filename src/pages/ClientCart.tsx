import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import logo from "../assets/logo.png";
import Navbar from "../components/Navbar";


export default function ClientCart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const userRef = doc(db, "users", user.uid); // fixed path
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setCartItems(data.itemsInCart || []);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemName: string) => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const userRef = doc(db, "users", user.uid); // fixed path
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const updatedCart = (data.itemsInCart || []).filter((item: string) => item !== itemName);
        await updateDoc(userRef, { itemsInCart: updatedCart });
        setCartItems(updatedCart);
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      for (const itemName of cartItems) {
        await addDoc(collection(db, "orders"), {
          userId: user.uid,
          productName: itemName,
          createdAt: new Date()
        });
      }

      const userRef = doc(db, "users", user.uid); // fixed path
      await updateDoc(userRef, { itemsInCart: [] });

      navigate("/checked-out");
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading cart...</div>;

  const total = cartItems.length * 25;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Use Navbar component */}
      <Navbar />

      {/* Cart Header */}
      <div className="text-center mt-8">
        <h1 className="text-5xl font-light tracking-widest">CART</h1>
        <img src={logo} alt="Flutter Box Logo" className="mx-auto mt-4 w-24 h-24" />
      </div>

      {/* Cart Items */}
      <div className="bg-purple-100 rounded-lg p-6 mt-8 w-full max-w-lg shadow">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((itemName, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-white p-4 mb-4 rounded shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-200 rounded" />
                <span className="text-gray-800">{itemName}</span>
              </div>
              <button
                onClick={() => removeItem(itemName)}
                className="text-purple-600 hover:text-purple-800 text-xl"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {/* Total & Checkout */}
      <div className="text-center mt-8">
        <p className="text-lg font-semibold mb-2">Total: ${total.toFixed(2)}</p>
        <button
          onClick={handleCheckout}
          className="text-purple-600 hover:underline mt-2"
        >
          Checkout and Purchase
        </button>
      </div>
    </div>
  );
}
