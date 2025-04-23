import {FaPen} from "react-icons/fa";

const ProductCard = ({
  name,
  vendor,
    }: {
      name: string;
      vendor: boolean;
    }) => (
    <div className="relative w-30 h-40 bg-purple-100 rounded-lg shadow-md flex flex-col items-center justify-between p-5 m-5">
      {vendor && <FaPen className="absolute top-2 left-2 text-purple-400" />}
      <div className="w-10 h-10 bg-black-300 rounded-full mt-6" />
      <p className="text-sm text-center mt-2">{name}</p>
      <span className="absolute top-2 right-2 text-sm font-bold">$25</span>
    </div>
  );

  export default ProductCard;