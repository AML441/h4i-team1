import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase/firebase";
import LoginPage from "./pages/LoginPage";
import ClientProductCatalogue from "./pages/ClientProductCatalogue";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css"
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import VendorProductCatalogue from "./pages/VendorProductCatalogue";

function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
      return unsub;
    }, []);
  
    return (
        <>
            <div>
            <h1 className="bg-blue-500"> Testing</h1>
            </div>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={user ? <ClientProductCatalogue user={user}/> : <Navigate to="login" replace/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vendor-catalogue" element={<VendorProductCatalogue />} />
            </Routes>
        </BrowserRouter>
      </>
    );
}

export default App;