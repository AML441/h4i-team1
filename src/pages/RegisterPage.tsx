import Navbar from "../components/Navbar";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { Client } from "../types/User";
import { Link, useNavigate } from "react-router";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const defaultData: Client = {
        email: email,
        name: name,
        id: userCred.user.uid,
        itemsInCart: [],
        role: "client",
      };
      await setDoc(doc(db, "users", userCred.user.uid), defaultData);
      await navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col mt-36 w-full max-w-md items-center">
          <h1 className="text-[#8330AA] font-abel text-5xl mb-5">
            REGISTER
          </h1>

          <div className="w-full mb-6">
            <h2 className="text-left font-abel text-xl mb-1">Name</h2>
            <input
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#C7A2D8]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </div>

          <div className="w-full mb-6">
            <h2 className="text-left font-abel text-xl mb-1">Email</h2>
            <input
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#C7A2D8]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>

          <div className="w-full mb-6">
            <h2 className="text-left font-abel text-xl mb-1">Password</h2>
            <input
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#C7A2D8]"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full mb-10">
            <h2 className="text-left font-abel text-xl mb-1">
              Confirm Password
            </h2>
            <input
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#C7A2D8]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
            />
          </div>

          <button
            className="w-full h-12 bg-[#CF93EB] hover:bg-[#8330AA] text-white font-abel py-2 rounded-2xl cursor-pointer mb-6"
            onClick={handleRegister}
          >
            CREATE ACCOUNT
          </button>

          <Link
            to="/login"
            className="text-lg text-[#8330AA] font-abel underline cursor-pointer select-none"
          >
            Have an account? Login here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
