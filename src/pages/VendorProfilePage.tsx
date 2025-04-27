import { getAuth, signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Client } from "../types/User";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import VendorNavbar from "../components/VendorNavbar";
import { useAuth } from "../auth/AuthProvider";

function VendorProfilePage() {
  // Check for client/vendor status
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role !== "vendor") {
    return <Navigate to="/" />;
  }

  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClientData() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        console.log("Current user UID:", user.uid);
        try {
          const clientRef = doc(db, "users", user.uid);
          const clientSnap = await getDoc(clientRef);

          if (clientSnap.exists()) {
            setClient(clientSnap.data() as Client);
          } else {
            console.error("No client document found!");
          }
        } catch (error) {
          console.error("Error fetching client data:", error);
        }
      } else {
        console.error("No user is signed in!");
      }
      setLoading(false);
    }

    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in with UID:", user.uid);
        fetchClientData();
      } else {
        console.error("No user is signed in!");
        setLoading(false);
      }
    });
  }, []);

  if (!client) {
    return <div>Could not load vendor profile.</div>;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <VendorNavbar />
      <div className="mx-auto mt-50 w-[90rem] bg-[#FCF6FF] border border-[#ECC3FF] p-6 rounded-xl">
        <p className="text-4xl font-abel mt-8 mb-8">Name: {client.name}</p>
        <p className="text-4xl font-abel mt-8 mb-8">Email: {client.email}</p>
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-[#CF93EB] hover:bg-[#8330AA] text-white font-bold py-2 px-4 rounded h-12"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default VendorProfilePage;
