import React, { useState } from "react";
import { Item } from "../types/Item";

interface ProductCardClientProps {
  productId: string;
  name: string;
  price: number;
  description: string;
  image: string;
  addToCart: () => void;
}

const ProductCardClient: React.FC<ProductCardClientProps> = ({
 // productId, NOT NEEDED
  name,
  price,
//  description, NOT NEEDED
  image,
  addToCart,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(!isSelected);
    addToCart(); // Add the item to the cart when selected and then user can go check the item out
  };

  return (
    <div
      className={`relative w-40 h-auto bg-purple-100 rounded-lg shadow-md flex flex-col items-center justify-between p-4 m-4 ${isSelected ? "bg-green-100" : ""}`}>
        <p className="text-md font-semibold text-center">{name}</p>
      <img src={image} className="w-32 h-32 object-cover mb-4 rounded-lg" />
      <span className="text-lg font-bold text-purple-700 mt-2">${price}</span>

      {/* Add to Cart Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering select on button click
          addToCart();
        }}
        className="bg-purple-500 text-white p-2 rounded-lg w-full mt-4 hover:bg-white hover:text-purple-500 border-2 border-purple-300 transition-all duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCardClient;
