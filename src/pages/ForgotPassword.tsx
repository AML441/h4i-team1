import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col mt-36 w-full max-w-md items-center">
            <h1 className="text-[#8330AA] font-abel font-medium text-5xl mb-20">FORGOT PASSWORD</h1>
                {sent ? (
                <p className="font-abel text-[#8330AA]">Password reset email sent!</p>
                ) : (
                <>
                    <div className="w-full mb-6">
                        <h2 className="text-left font-abel text-xl mb-1">Email</h2>
                        <input
                        className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#C7A2D8]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full h-12 bg-[#CF93EB] hover:bg-[#8330AA] text-white font-bold py-2 rounded-2xl cursor-pointer mb-10"
                        onClick={handleReset}
                    >
                        SEND PASSWORD RESET LINK
                    </button>
                </>
                )}
    
            <Link 
                className="mt-4 text-lg text-[#8330AA] font-abel underline cursor-pointer select-none" 
                to="/login">
                Back to Login
            </Link>
        </div>
      </div>
    </div>
  );
}