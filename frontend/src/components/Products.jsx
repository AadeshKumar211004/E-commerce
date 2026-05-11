import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/product")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to continue shopping.");
      navigate("/login");
      return;
    }

    try {
      await API.post(
        "/cart",
        {
          productId: id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Added to cart 🛒");
    } catch {
      alert("Error ❌");
    }
  };

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #ffffff, #EFF6FF)",
        padding: "80px 0",
      }}
    >
      <div className="container">

        {/* 🔥 HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2
              style={{
                fontWeight: "700",
                color: "#111827",
              }}
            >
               Products
            </h2>

            <p style={{ color: "#6B7280", marginTop: "5px" }}>
              Discover our best selling items
            </p>
          </div>

          <Link
            to="/products"
            style={{
              color: "#2563EB",
              fontWeight: "500",
              textDecoration: "none",
            }}
          >
            View All →
          </Link>
        </div>

        {/* 🔥 PRODUCTS */}
        <div
          className="d-flex gap-4 overflow-auto"
          style={{
            scrollSnapType: "x mandatory",
            paddingBottom: "10px",
          }}
        >
          {products.slice(0, 10).map((p) => (
            <div
              key={p._id}
              style={{
                minWidth: "260px",
                scrollSnapAlign: "start",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0,0,0,0.08)";
              }}
            >
              <ProductCard product={p} addToCart={addToCart} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;