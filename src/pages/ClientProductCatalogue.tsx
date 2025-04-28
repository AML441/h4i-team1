import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Item } from "../types/Item";

// No more hardcoded products here! We'll load from Firestore instead.

export default function ClientProductCatalogue() {
  // Check for client/vendor status
  const { user, loading, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }
  const [products, setProducts] = useState<Item[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const productList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Item[];
        setProducts(productList);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading || loadingProducts) {
    return (
      <div className="text-center mt-20 text-xl font-abel">Loading...</div>
    );

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

  const addToCart = async (item: Item) => {
    try {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        itemsInCart: arrayUnion(item),
      });
      alert(`"${item.name}" added to cart!`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center px-5 font-abel mt-10">
        <div className="flex flex-col items-center w-full">
          <div className="flex w-full justify-center gap-150 mb-10">
            <h2 className="text-5xl font-light my-6">PRODUCTS</h2>
          </div>

          <div className="flex flex-wrap justify-center">
            {products.map((item) => (
               <ProductCard 
               key={item.id}  // Use the product's id as the key
               name={item.name}  // Access name from the full item object
               vendor={false} 
               addToCart={() => addToCart(item)}  // Pass the full item object to addToCart
             /> 
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
