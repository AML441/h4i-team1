import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import cartIcon from "../assets/cart.png";
import homeIcon from "../assets/home.png";
import userIcon from "../assets/user.png";

export default function ClientCartCheckedOut() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Navbar */}
      <div className="bg-purple-300 w-full flex justify-between p-4">
        <span className="text-purple-900 font-medium">Thank you!</span>
        <div className="flex gap-4">
          <img src={userIcon} alt="User" className="w-6 h-6" />
          <img src={cartIcon} alt="Cart" className="w-6 h-6" />
          <img src={homeIcon} alt="Home" className="w-6 h-6" />
        </div>
      </div>

      {/* Logo */}
      <div className="text-center mt-8">
        <img src={logo} alt="Flutter Box Logo" className="mx-auto w-24 h-24" />
      </div>

      {/* Success checkmark and message */}
      <div className="text-center mt-16">
        <div className="w-24 h-24 mx-auto border-4 border-purple-500 rounded-full flex items-center justify-center">
          <span className="text-5xl text-purple-500">✓</span>
        </div>

        <p className="mt-8 text-purple-700 text-lg font-medium leading-relaxed">
          Items purchased!<br />
          Thanks for shopping Flutter Box.
        </p>

        <button
          onClick={() => navigate("/")}
          className="text-purple-600 hover:underline mt-8"
        >
          Back to products
        </button>
      </div>
    </div>
  );
}
