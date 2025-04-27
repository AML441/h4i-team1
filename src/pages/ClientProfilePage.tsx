import { getAuth, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Client } from "../types/User";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Navigate } from "react-router";
import { useAuth } from "../auth/AuthProvider";

function ClientProfilePage() {
  // Check for client/vendor status
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role !== "client") {
    return <Navigate to="*" />;
  }

  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

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
    }
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in with UID:", user.uid);
        fetchClientData(); // Fetch client data once the user is authenticated
      } else {
        console.error("No user is signed in!");
        setLoading(false); // Make sure loading is false if no user is logged in
      }
    });
  }, []);

  if (!client) {
    return <div>Could not load client profile.</div>;
  }

  return (
    <div>
      <Navbar />
      <div></div>
      <div className="mx-auto mt-50 w-[90rem] bg-[#FCF6FF] border border-[#ECC3FF] p-6 rounded-xl">
        <p className="text-4xl font-abel mt-8 mb-8">Name: {client.name}</p>
        <p className="text-4xl font-abel mt-8 mb-8">Email: {client.email} </p>
        <p className="text-4xl font-abel mt-8 mb-8">User Stats: </p>
        <p className="text-4xl font-abel mt-8 mb-8 ml-8">
          Number of Items In Cart: {client.itemsInCart.length}
        </p>
      </div>
    </div>
  );
}

export default ClientProfilePage;
