import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { Client } from "../types/Client";
import { signOut, User } from "firebase/auth";
import Navbar from "../components/Navbar";

interface CatalogueProps {
    user: User;
}
  
export default function ClientProductCatalogue({ user }: CatalogueProps) {

    const handleLogout = async () => {
        try {
        await signOut(auth);
        } catch (error) {
        console.error("Error signing out:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center my-15">
                <h1 className="mt-20 mb-4">Welcome, {user.email}</h1>
                <button className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer" 
                        onClick={handleLogout}>Log Out</button>
            </div>
        </>
    );
}



