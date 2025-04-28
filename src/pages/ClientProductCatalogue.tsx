import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useAuth } from "../auth/AuthProvider";
import Navbar from "../components/Navbar";
import ProductCardClient from "../components/ProductCardClient";
import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { Item } from "../types/Item";

export default function ClientProductCatalogue() {
  const { user, loading, role } = useAuth();
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

  const addToCart = async (item: Item) => {
    try {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        itemsInCart: arrayUnion(item), // Add the item to the cart array
      });
      alert(`"${item.name}" added to cart!`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  if (loading || loadingProducts) {
    return (
      <div className="text-center mt-20 text-xl font-abel">Loading...</div>
    );
  }

  if (role !== "client") {
    return <Navigate to="*" />;
  }

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
              <ProductCardClient
                key={item.id}
                productId={item.id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
                addToCart={() => addToCart(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
