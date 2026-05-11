import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center text-center"
      style={{ marginTop: "100px", marginBottom: "60px", minHeight: "60vh" }}
    >

      {/* ✅ ICON */}
      <FaCheckCircle
        size={70}
        style={{
          color: "#C8A96A",
          marginBottom: "20px",
          animation: "pop 0.6s ease",
        }}
      />

      {/* 🎉 MESSAGE */}
      <h3 style={{ color: "#1A1A1A" }}>
        Order Placed Successfully!
      </h3>

      <p style={{ color: "#555", maxWidth: "400px" }}>
        Thank you for your purchase. Your order has been placed and will be processed soon.
      </p>

      {/* 🛍 BUTTON */}
      <button
        className="btn mt-3"
        style={{
          backgroundColor: "#1A1A1A",
          color: "#F5F2EB",
          padding: "10px 20px",
        }}
        onClick={() => navigate("/")}
      >
        Continue Shopping
      </button>

      {/* 🔥 ANIMATION */}
      <style>
        {`
          @keyframes pop {
            0% { transform: scale(0.5); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>

    </div>
  );
}

export default OrderSuccess;