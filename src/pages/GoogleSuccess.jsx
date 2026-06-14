import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

function GoogleSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const user = searchParams.get("user");

    if (!token || !user) {
      toast.error("Google login failed");
      navigate("/");
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", decodeURIComponent(user));

    toast.success("Google login successful");

    setTimeout(() => {
      navigate("/dashboard");
    }, 700);
  }, [navigate, searchParams]);

  return (
    <div className="google-success-page">
      <div className="google-success-card">
        <div className="google-loader"></div>

        <h2>Signing you in...</h2>

        <p>Please wait while we secure your Job Tracker workspace.</p>
      </div>
    </div>
  );
}

export default GoogleSuccess;