import { User } from "firebase/auth";
import React from "react";
import Navbar from "../components/Navbar";
import { Client } from "../types/User";

//  interface ProfileProps {
//      client : Client;
//  }

function ClientProfilePage(/*{ client } : ProfileProps*/) {
  return (
    <div>
      <Navbar />
      <div></div>
      <div className="mx-auto mt-50 w-[90rem] bg-[#FCF6FF] border border-[#ECC3FF] p-6 rounded-xl">
        <p className="text-4xl font-abel mt-8 mb-8">Name: </p>
        <p className="text-4xl font-abel mt-8 mb-8">Email: </p>
        <p className="text-4xl font-abel mt-8 mb-8">User Stats: </p>
        <p className="text-4xl font-abel mt-8 mb-8 ml-8">
          Number of Purchases:
        </p>
      </div>
    </div>
  );
}

export default ClientProfilePage;
