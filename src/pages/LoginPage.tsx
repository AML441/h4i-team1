import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthProvider";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, role, loading } = useAuth();

  const handleAuth = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (!loading && user && role) {
      if (role === "client") {
        navigate("/", { replace: true });
      } else if (role === "vendor") {
        navigate("/vendor-catalogue", { replace: true });
      }
    }
  }, [user, role, loading, navigate]);

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col mt-36 w-full max-w-md items-center">
          <h1 className="text-[#8330AA] font-abel font-medium text-5xl mb-5">
            LOGIN
          </h1>

          <div className="w-full mb-6">
            <h2 className="text-left font-abel text-xl mb-1">Email</h2>
            <input
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#C7A2D8]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="w-full mb-2">
            <h2 className="text-left font-abel text-xl mb-1">Password</h2>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#C7A2D8]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full text-right mb-6">
            <Link
              to="/forgot-password"
              className="text-lg text-[#8330AA] font-abel underline cursor-pointer select-none"
            >
              Forgot password?
            </Link>
          </div>

          <button
            className="w-full h-12 bg-[#CF93EB] hover:bg-[#8330AA] text-white font-bold py-2 rounded-2xl cursor-pointer mb-10"
            onClick={handleAuth}
          >
            LOGIN
          </button>

          <Link
            to="/register"
            className="text-lg text-[#8330AA] font-abel underline cursor-pointer select-none"
          >
            New shopper? Register here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
