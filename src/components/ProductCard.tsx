import { FaPen } from "react-icons/fa";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

interface ProductCardProps {
  productId: string;
  name: string;
  price: number;
  description: string;
  image: string;
  vendor: boolean; // assuming `vendor` is used to conditionally render vendor-related content
}

const ProductCard = ({
  productId,
  name,
  price,
  description,
  image,
  vendor,
}: ProductCardProps) => {
  // new states for editing purposes by user
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedImage, setEditedImage] = useState(image);

  // current states
  const [currentName, setCurrentName] = useState(name);
  const [currentPrice, setCurrentPrice] = useState(price);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [currentImage, setCurrentImage] = useState(image);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editedName) {
      console.error("Product name is missing!");
      return;
    }

    try {
      console.log("Attempting to update product with name:", editedName);

      // Use the productId as the document reference
      const productRef = doc(db, "products", productId); // note that product id is used to refer to products

      await updateDoc(productRef, {
        name: editedName,
        price: editedPrice,
        description: editedDescription,
        image: editedImage,
      });

      // setting current attributes to edited new attributes and making isEditing false to close the pop up modal
      setIsEditing(false);
      setCurrentName(editedName);
      setCurrentPrice(editedPrice);
      setCurrentDescription(editedDescription);
      setCurrentImage(editedImage);

    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // use decides to cancel their changes nothing changes
  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(currentName);
    setEditedPrice(currentPrice);
    setEditedDescription(currentDescription);
    setEditedImage(currentImage);
  };

  return (
    <div className="relative w-40 h-auto bg-purple-100 rounded-lg shadow-md flex flex-col items-center justify-center p-4 m-4">
      {vendor && (
        <button
          onClick={handleEdit}
          className="absolute top-2 left-2 text-purple-400"
        >
          <FaPen />
        </button>
      )}

      <p className="text-md mt-3 font-abel text-center h-15">{currentName}</p>
      <img src={image} className="w-32 h-32 object-cover rounded-lg" />
      <span className="text-lg font-abel text-purple-700 mt-2">${currentPrice}</span>

      {/* Edit Modal */}
      {isEditing && (
        <div className="bg-transparent backdrop-blur fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Edit Product</h2>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium">
                Product Name
              </label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="Name"
                className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium">
                Price
              </label>
              <input
                type="number"
                value={editedPrice}
                onChange={(e) => setEditedPrice(Number(e.target.value))}
                placeholder="Price"
                className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium">
                Description
              </label>
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Description"
                className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium">
                Image URL
              </label>
              <input
                type="text"
                value={editedImage}
                onChange={(e) => setEditedImage(e.target.value)}
                placeholder="Image URL"
                className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
