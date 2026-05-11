import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/product/${id}`);
      setProduct(res.data);

      // 🔥 related products (same category)
      const relatedRes = await API.get("/product");
      const filtered = relatedRes.data.filter(
        (p) => p.category === res.data.category && p._id !== id
      );

      setRelated(filtered.slice(0, 4));
    };

    fetchProduct();
  }, [id]);

  if (!product) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <div className="container" style={{ marginTop: "100px", marginBottom: "60px" }}>

      {/* 🔹 MAIN PRODUCT */}
      <div className="row mb-5">

        <div className="col-md-5">
          <img
            src={product.image}
            alt=""
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-7">
          <h3>{product.name}</h3>
          <p>{product.description}</p>

          <h4 style={{ color: "#C8A96A" }}>₹{product.price}</h4>

          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Stock:</strong> {product.stock}</p>

          <button className="btn btn-dark mt-3">
            Add to Cart
          </button>
        </div>

      </div>

      {/* 🔹 RELATED PRODUCTS */}
      <h4 className="mb-3" style={{ color: "#C8A96A" }}>
        You May Also Like
      </h4>

      <div className="row">
        {related.map((p) => (
          <div key={p._id} className="col-md-3 mb-3">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default ProductDetails;