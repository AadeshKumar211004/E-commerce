import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditProduct() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    getSingleProduct();
  }, []);

  const getSingleProduct = async () => {

    try {

      const res = await API.get(`/product/${id}`);

      setFormData({
        name: res.data.name,
        title: res.data.title,
        description: res.data.description,
        price: res.data.price,
        stock: res.data.stock,
        image: res.data.image,
      });

    } catch (error) {

      console.log(error);

    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.put(`/product/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Updated Successfully");

      navigate("/admin/products");

    } catch (error) {

      console.log(error);

    }
  };

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
            maxWidth: "700px",
            margin: "0 auto",
            background: "#ffffff",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >

          <h2
            style={{
              fontWeight: "800",
              color: "#111827",
              marginBottom: "10px",
            }}
          >
            Edit Product
          </h2>

          <p
            style={{
              color: "#6B7280",
              marginBottom: "30px",
            }}
          >
            Update your product information.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="mb-4">

              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "600",
                }}
              >
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #D1D5DB",
                  outline: "none",
                }}
              />

            </div>

            <div className="mb-4">

              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "600",
                }}
              >
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #D1D5DB",
                  outline: "none",
                }}
              />

            </div>

            <div className="mb-4">

              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "600",
                }}
              >
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #D1D5DB",
                  outline: "none",
                  resize: "none",
                }}
              ></textarea>

            </div>

            <div className="row">

              <div className="col-md-6 mb-4">

                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    fontWeight: "600",
                  }}
                >
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #D1D5DB",
                    outline: "none",
                  }}
                />

              </div>

              <div className="col-md-6 mb-4">

                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    fontWeight: "600",
                  }}
                >
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #D1D5DB",
                    outline: "none",
                  }}
                />

              </div>

            </div>

            <div className="mb-4">

              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "600",
                }}
              >
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #D1D5DB",
                  outline: "none",
                }}
              />

            </div>

            {
              formData.image && (

                <div className="mb-4 text-center">

                  <img
                    src={formData.image}
                    alt="preview"
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "15px",
                    }}
                  />

                </div>

              )
            }

            <button
              type="submit"
              style={{
                width: "100%",
                background: "#2563EB",
                color: "#fff",
                border: "none",
                padding: "14px",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "16px",
                boxShadow: "0 10px 25px rgba(37,99,235,0.25)",
              }}
            >
              Update Product
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default EditProduct;