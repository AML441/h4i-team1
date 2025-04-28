import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useAuth } from "../auth/AuthProvider";
import Navbar from "../components/Navbar";
import ProductCardClient from "../components/ProductCardClient";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { Item } from "../types/Item";

export default function ClientProductCatalogue() {
  const { user, loading, role } = useAuth();
  const [products, setProducts] = useState<Item[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Item | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Item[];
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
        itemsInCart: arrayUnion(item),
      });
      alert(`"${item.name}" added to cart!`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const openModal = (item: Item) => {
    setSelectedProduct(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
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
              <div
                key={item.id}
                onClick={() => openModal(item)}
                className="hover: cursor-pointer"
              >
                <ProductCardClient
                  productId={item.id}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  image={item.image}
                  addToCart={() => addToCart(item)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 flex bg-transparent backdrop-blur justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 max-w-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-40 h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-abel mb-2 text-purple-600">
                {selectedProduct.name}
              </h2>

              <p className="text-gray-700 mb-2 font-abel">{selectedProduct.description}</p>
              <p className="text-lg font-abel text-purple-500 mb-4">

                ${selectedProduct.price}
              </p>
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  closeModal();
                }}
                className="bg-purple-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-purple-600 hover:cursor-pointer transition"

              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
