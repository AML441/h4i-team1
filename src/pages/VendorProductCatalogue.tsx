import { db } from "../firebase/firebase";
import VendorNavbar from "../components/VendorNavbar";
import { FaPlus } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router";

// AddCard is used at the end of list of products to add new products on vendor side
const AddCard = ({ openModal }: { openModal: () => void }) => (
  <div
    className="w-30 h-40 border-2 border-purple-300 rounded-lg flex items-center justify-center m-5 text-purple-400 hover:bg-purple-100 transition font-abel"
    onClick={openModal} // Trigger the openModal function when clicked
  >
    <FaPlus size={30} />
  </div>
);

type Product = {
  name: string;
  price: number;
  description: string;
  image: string;
};

export default function VendorProductCatalogue() {
  // Check for client/vendor status
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role !== "vendor") {
    return <Navigate to="/" />;
  }

  // initalizations for states
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    price: 0,
    description: "",
    image: "",
  });

  // constants to handle the modal's visibility (alternates from true to false)
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // fetching from firestore here
  useEffect(() => {
    async function fetchProducts() {
      const snapshot = await getDocs(collection(db, "products"));
      const productsList = snapshot.docs.map((doc) => doc.data() as Product);
      setProducts(productsList);
    }

    fetchProducts();
  }, []);

  // Handle input change for new product
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // use handleSubmit on the modal to add the new product to our firestore db
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "products"), newProduct);
      console.log("Product added with ID:", docRef.id);
      closeModal(); // turn the modal's boolean to false so that we close the form once user clicks submit
      setNewProduct({
        name: "",
        price: 0,
        description: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <VendorNavbar />
      <div className="flex flex-col items-center px-5 font-abel mt-10">
        <div className="flex flex-col items-center w-full">
          <div className="flex w-full justify-center gap-150 mb-10">
            <h2 className="text-5xl font-light my-6">PRODUCTS</h2>
            <h2 className="text-5xl font-light my-6">PRODUCTS</h2>
          </div>

          <div className="m-10">
            <div className="flex flex-wrap">
              {products.map((product) => (
                <ProductCard
                  key={product.name}
                  name={product.name}
                  vendor={true}
                />
              ))}
              {/* Pass the openModal function to AddCard as a prop */}
              <AddCard openModal={openModal} />
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 flex bg-transparent backdrop-blur justify-center items-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 max-w-lg">
                <h2 className="text-2xl font-semibold mb-6 text-purple-500">
                  Add New Product
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={newProduct.description}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={newProduct.image}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div className="flex justify-between gap-4">
                    <button
                      type="submit"
                      className="bg-purple-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-purple-600 transition"
                    >
                      Add Product
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="bg-gray-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
