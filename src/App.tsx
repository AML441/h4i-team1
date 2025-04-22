import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase/firebase";
import LoginPage from "./pages/LoginPage";
import ClientProductCatalogue from "./pages/ClientProductCatalogue";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css"
import ForgotPassword from "./pages/ForgotPassword";
import RegisterPage from "./pages/RegisterPage";
import VendorProductCatalogue from "./pages/VendorProductCatalogue";
import ClientProfilePage from "./pages/ClientProfilePage";

function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
      return unsub;
    }, []);
  
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <ClientProductCatalogue user={user}/> : <Navigate to="login" replace/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/vendor-catalogue" element={<VendorProductCatalogue />} />
          <Route path="/client-catalogue" element={<ClientProductCatalogue />} />
          <Route path="/client-profile" element={<ClientProfilePage />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;