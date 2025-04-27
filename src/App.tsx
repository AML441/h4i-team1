import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import ClientProductCatalogue from "./pages/ClientProductCatalogue";
import VendorProductCatalogue from "./pages/VendorProductCatalogue";
import ClientCartCheckedOut from "./pages/ClientCartCheckedOut";
import VendorProductPage from "./pages/VendorProductPage";
import ClientProfilePage from "./pages/ClientProfilePage";
import "./App.css";
import ClientCart from "./pages/ClientCart";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/" element={<ClientProductCatalogue />} />
          <Route
            path="/vendor-catalogue"
            element={<VendorProductCatalogue />}
          />
          <Route path="/checkout-out" element={<ClientCartCheckedOut />} />
          <Route path="/cart" element={<ClientCart />} />
          <Route path="/vendor-products" element={<VendorProductPage />} />
          <Route path="/client-profile" element={<ClientProfilePage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
