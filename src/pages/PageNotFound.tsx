import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../auth/AuthProvider";

const PageNotFound = () => {
  const navigate = useNavigate();
  const { user, role } = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user) {
        navigate("/login");
      } else if (role === "client") {
        navigate("/");
      } else if (role === "vendor") {
        navigate("/vendor-catalogue");
      } else {
        navigate("/");
      }
    }, 4000);

    return () => clearTimeout(timeout);
  }, [navigate, user, role]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-30 font-abel">
        <h1 className="text-5xl text-[#8330AA] font-bold mb-6">
          404: Page Not Found
        </h1>
        <p className="text-2xl text-[#8330AA]">
          You will be redirected shortly...
        </p>
      </div>
    </>
  );
};

export default PageNotFound;
