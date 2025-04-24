import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase/firebase";
import LoginPage from "./pages/LoginPage";
import ClientProductCatalogue from "./pages/ClientProductCatalogue";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css"
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/RegisterPage";
import VendorProductCatalogue from "./pages/VendorProductCatalogue";
import ClientCartCheckedOut from "./pages/ClientCartCheckedOut";
import VendorProductPage from "./pages/VendorProductPage";
import ClientCart from "./pages/ClientCart";




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
            <Route path="/checked-out" element={<ClientCartCheckedOut />} />
            <Route path="/vendor-products" element={<VendorProductPage />} />
            <Route path="/cart" element={<ClientCart />} />


            </Routes>
        </BrowserRouter>
      </>
    );
}

export default App;