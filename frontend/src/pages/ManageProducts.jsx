import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ManageProducts() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const res = await API.get("/product");

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Deleted");

      fetchProducts();

    } catch (error) {

      console.log(error);

    }
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#EFF6FF,#ffffff)",
        padding: "80px 0",
      }}
    >
      <div className="container">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "40px",
          }}
        >

          <div>

            <h2
              style={{
                fontWeight: "800",
                color: "#111827",
              }}
            >
              Manage Products
            </h2>

            <p
              style={{
                color: "#6B7280",
                marginTop: "10px",
              }}
            >
              Add, edit and manage your store products.
            </p>

          </div>

          <button
            onClick={() => navigate("/admin/add-product")}
            style={{
              background: "#2563EB",
              color: "#fff",
              border: "none",
              padding: "12px 22px",
              borderRadius: "10px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 10px 25px rgba(37,99,235,0.25)",
            }}
          >
            <FaPlus />
            Add Product
          </button>

        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >

          <div
            style={{
              position: "relative",
              marginBottom: "30px",
            }}
          >

            <FaSearch
              style={{
                position: "absolute",
                top: "15px",
                left: "15px",
                color: "#6B7280",
              }}
            />

            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px 12px 45px",
                borderRadius: "10px",
                border: "1px solid #D1D5DB",
                outline: "none",
              }}
            />

          </div>

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredProducts.map((item) => (

                  <tr key={item._id}>

                    <td>

                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />

                    </td>

                    <td
                      style={{
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      {item.name}
                    </td>

                    <td>{item.title}</td>

                    <td
                      style={{
                        color: "#2563EB",
                        fontWeight: "700",
                      }}
                    >
                      ₹{item.price}
                    </td>

                    <td>

                      <span
                        style={{
                          background:
                            item.stock > 0
                              ? "#D1FAE5"
                              : "#FEE2E2",

                          color:
                            item.stock > 0
                              ? "#065F46"
                              : "#991B1B",

                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        {item.stock > 0
                          ? `${item.stock} In Stock`
                          : "Out of Stock"}
                      </span>

                    </td>

                    <td>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >

                        <button
                          onClick={() =>
                            navigate(`/admin/edit-product/${item._id}`)
                          }
                          style={{
                            background: "#F97316",
                            color: "#fff",
                            border: "none",
                            padding: "10px 14px",
                            borderRadius: "8px",
                          }}
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => deleteProduct(item._id)}
                          style={{
                            background: "#EF4444",
                            color: "#fff",
                            border: "none",
                            padding: "10px 14px",
                            borderRadius: "8px",
                          }}
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ManageProducts;