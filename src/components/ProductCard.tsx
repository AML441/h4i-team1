import {FaPen} from "react-icons/fa";

const ProductCard = ({ name }: { name: string }) => (
    <div className="relative w-36 h-40 bg-purple-100 rounded-lg shadow-md flex flex-col items-center justify-between p-2 m-2">
      <FaPen className="absolute top-2 left-2 text-purple-400" />
      <div className="w-12 h-12 bg-black-300 rounded-full mt-6" />
      <p className="text-sm text-center mt-2">{name}</p>
      <span className="absolute top-2 right-2 text-sm font-bold">$25</span>
    </div>
  );

  export default ProductCard;