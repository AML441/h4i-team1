import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { Item } from "../types/Item";
import Navbar from "../components/Navbar";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const productDoc = await getDoc(doc(db, "products", id));
        if (productDoc.exists()) {
          setProduct({ id: productDoc.id, ...productDoc.data() } as Item);
        } else {
          console.error("No such product!");
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-20 text-xl font-abel animate-pulse">Loading product...</div>;
  }

  if (!product) {
    return <div className="text-center mt-20 text-xl font-abel text-red-400">Product not found!</div>;
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto my-40 p-5">

        <div className="flex flex-row bg-[#FCF6FF] rounded-2xl shadow-xl p-10 outline-dashed outline-[#C7A2D8] w-[60vw] items-center justify-center mx-auto">
         
          <img
            src={product.image}
            alt={product.name}
            className="w-72 h-72 object-cover rounded-xl mb-8 shadow-md"
          />

          <div className="flex flex-col m-10">
            <h2 className="text-5xl font-abel mb-10">{product.name}</h2>
            <p className="text-3xl text-[#4B5563] font-bold mb-4 font-abel">${product.price}</p>
            <p className="text-lg font-abel">{product.description}</p>
            <button
                onClick={() => navigate("/")}
                className="m-10 p-5 bg-[#C7A2D8] hover:bg-[#CF93EB] text-white rounded-xl font-abel shadow-md">
                ← Back to Catalogue
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
}
