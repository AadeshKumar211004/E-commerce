import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/product");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🟡 LOADING UI
  if (loading) {
    return (
      <div className="container text-center" style={{ marginTop: "100px" }}>
        <h5>Loading products...</h5>
      </div>
    );
  }

  // 🟡 EMPTY UI
  if (products.length === 0) {
    return (
      <div
        className="container text-center"
        style={{ marginTop: "100px", marginBottom: "60px" }}
      >
        <h4>No Products Available</h4>
        <p>Come back later!</p>
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{ marginTop: "100px", marginBottom: "60px" }}
    >
      <h3 className="mb-4" style={{ color: "#C8A96A" }}>
        All Products
      </h3>

      <div className="row">
        {products.map((p) => (
          <div key={p._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;