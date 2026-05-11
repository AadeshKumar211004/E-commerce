import { useNavigate } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!token) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    addToCart(product._id);
  };

  return (
    <div
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        position: "relative",
      }}
      onClick={() => navigate(`/product/${product._id}`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow =
          "0 20px 40px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 10px 30px rgba(0,0,0,0.08)";
      }}
    >
      {/* 🔥 DISCOUNT BADGE */}
      <span
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "#F97316",
          color: "#fff",
          fontSize: "12px",
          padding: "4px 8px",
          borderRadius: "6px",
          zIndex: 2,
        }}
      >
        -20%
      </span>

      {/* ❤️ WISHLIST */}
      <span
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "18px",
          background: "#fff",
          borderRadius: "50%",
          padding: "6px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          zIndex: 2,
        }}
      >
        ❤️
      </span>

      {/* 🖼 IMAGE */}
      <div style={{ overflow: "hidden" }}>
        <img
          src={product.image || "/default.png"}
          alt={product.name}
          style={{
            width: "100%",
            height: "240px",
            objectFit: "cover",
            transition: "0.4s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        />
      </div>

      {/* 📦 CONTENT */}
      <div
        style={{
          padding: "15px",
          textAlign: "center",
        }}
      >
        {/* NAME */}
        <h6
          style={{
            fontWeight: "600",
            color: "#111827",
          }}
        >
          {product.name}
        </h6>

        {/* TITLE */}
        <p
          style={{
            fontSize: "13px",
            color: "#6B7280",
            marginBottom: "6px",
          }}
        >
          {product.title}
        </p>

        {/* ⭐ RATING */}
        <div style={{ color: "#FBBF24", fontSize: "14px" }}>
          ★★★★☆
        </div>

        {/* 💰 PRICE */}
        <p
          style={{
            marginTop: "6px",
            fontWeight: "bold",
            color: "#2563EB",
            fontSize: "16px",
          }}
        >
          ₹{product.price}
        </p>

        {/* 🟠 BUTTON */}
        <button
          onClick={handleAddToCart}
          style={{
            marginTop: "10px",
            width: "100%",
            background: "#F97316",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "8px",
            fontWeight: "500",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#ea580c";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#F97316";
          }}
        >
          {token ? "Add to Cart" : "Buy Now"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;