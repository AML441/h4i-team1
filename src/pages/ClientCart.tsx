import { Navigate, useNavigate } from "react-router";
import { collection, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import cartIcon from "../assets/cart.png";
import homeIcon from "../assets/home.png";
import userIcon from "../assets/user.png";
import logo from "../assets/logo.png";
import Navbar from "../components/Navbar";
import { useAuth } from "../auth/AuthProvider";
import { useEffect, useState } from "react";
import { Item } from "../types/Item";

export default function ClientCart() {
  // Check for client/vendor status
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role !== "client") {
    return <Navigate to="*" />;
  }

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<Item[]>([]);
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
        const updatedCart = (data.itemsInCart || []).filter(
          (item: Item) => item.name !== itemName
        );
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
          productId: itemName.id,
          productName: itemName.name,
          quantity: 1,
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

  //const total = cartItems.length * 25;
  const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Use Navbar component */}
      <Navbar />

      {/* Cart Header */}

      <div className="text-center mt-45">
        <h1 className="text-5xl font-abel">CART</h1>
      </div>

      {/* Cart Items */}
      <div className="bg-purple-100 rounded-lg mt-10 p-6 w-full max-w-lg shadow">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 font-abel">Your cart is empty.</p>
        ) : (
          cartItems.map((itemName, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-white p-4 mb-4 rounded shadow"
            >
              <div className="flex items-center gap-4">
                <img src={itemName.image} className="w-20 h-20 object-cover rounded-lg" />
                <span className="text-gray-800">{itemName.name}</span>
              </div>
              <button
                onClick={() => removeItem(itemName.name)}
                className="text-purple-600 hover:text-purple-800 text-xl hover:cursor-pointer"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {/* Total & Checkout */}
      <div className="text-center mt-8">
        <p className="text-2xl font-abel mb-2">Total: ${total.toFixed(2)}</p>
        <button
          onClick={handleCheckout}

          className="bg-purple-500 text-white p-3 rounded-lg w-full mt-4 hover:bg-white hover:text-purple-500 hover:cursor-pointer border-2 border-purple-300 transition-all duration-300 font-abel"
        >
          Checkout and Purchase
        </button>
      </div>
    </div>
  );
}
