import { FaPen } from "react-icons/fa";

interface ProductCardProps {
  name: string;
  vendor: boolean;
  addToCart?: () => void; // ✨ NEW optional prop
}

const ProductCard = ({ name, vendor, addToCart }: ProductCardProps) => (
  <div className="relative w-30 h-50 bg-purple-100 rounded-lg shadow-md flex flex-col items-center justify-between p-5 m-5">
    {vendor && <FaPen className="absolute top-2 left-2 text-purple-400" />}
    <div className="w-10 h-10 bg-black-300 rounded-full mt-6" />
    <p className="text-sm text-center mt-2">{name}</p>
    <span className="absolute top-2 right-2 text-sm font-bold">$25</span>

    {addToCart && (
      <button
        onClick={addToCart}
        className="text-purple-600 hover:underline text-xs mt-2"
      >
        Add to Cart
      </button>
    )}
  </div>
);

export default ProductCard;
