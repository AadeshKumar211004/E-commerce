import React, { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    shippedOrders: 0,
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const token = localStorage.getItem("token");

      const productRes = await API.get("/product");

      const orderRes = await API.get("/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const pendingOrders = orderRes.data.filter(
        (item) => item.status === "pending"
      ).length;

      const confirmedOrders = orderRes.data.filter(
        (item) => item.status === "confirmed"
      ).length;

      const shippedOrders = orderRes.data.filter(
        (item) => item.status === "shipped"
      ).length;

     const totalRevenue = orderRes.data
      .filter((item) => item.status === "delivered")
      .reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );
      setStats({
        totalProducts: productRes.data.length,
        totalOrders: orderRes.data.length,
        totalRevenue,
        pendingOrders,
        confirmedOrders,
        shippedOrders,
      });

      const sortedOrders = orderRes.data.sort((a, b) => {

        const priority = {
          pending: 1,
          confirmed: 2,
          shipped: 3,
          delivered: 4,
        };

        return (
          priority[a.status] -
          priority[b.status]
        );

      });

      setOrders(sortedOrders);

    } catch (error) {

      console.log(error);

    }
  };

  const cards = [
    {
      title: "Products",
      value: stats.totalProducts,
      icon: <FaBoxOpen />,
      color: "#2563EB",
      bg: "#DBEAFE",
    },

    {
      title: "Orders",
      value: stats.totalOrders,
      icon: <FaShoppingCart />,
      color: "#F97316",
      bg: "#FFEDD5",
    },

    {
      title: "Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: <FaUsers />,
      color: "#10B981",
      bg: "#D1FAE5",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#EFF6FF,#ffffff)",
        padding: "80px 0",
      }}
    >
      <div className="container">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "50px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >

          <div>

            <h2
              style={{
                fontWeight: "800",
                color: "#111827",
              }}
            >
              Admin Dashboard
            </h2>

            <p
              style={{
                color: "#6B7280",
                marginTop: "10px",
              }}
            >
              Manage your products and orders.
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/admin/products")
            }
            style={{
              background: "#2563EB",
              color: "#fff",
              border: "none",
              padding: "12px 22px",
              borderRadius: "10px",
              fontWeight: "600",
              boxShadow:
                "0 10px 25px rgba(37,99,235,0.25)",
            }}
          >
            Manage Products
          </button>

        </div>

        <div className="row g-4 mb-5">

          {cards.map((item, index) => (

            <div
              className="col-lg-4 col-md-6"
              key={index}
            >

              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "20px",
                  padding: "30px",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                  cursor: "pointer",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-10px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                }}
              >

                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "18px",
                    background: item.bg,
                    color: item.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    marginBottom: "20px",
                  }}
                >
                  {item.icon}
                </div>

                <h2
                  style={{
                    fontWeight: "800",
                    color: "#111827",
                  }}
                >
                  {item.value}
                </h2>

                <p
                  style={{
                    color: "#6B7280",
                    marginBottom: "0",
                  }}
                >
                  Total {item.title}
                </p>

              </div>

            </div>

          ))}

        </div>

        <div className="row g-4 mb-5">

          <div className="col-md-4">

            <div
              style={{
                background: "#FEF2F2",
                padding: "25px",
                borderRadius: "18px",
              }}
            >

              <h3
                style={{
                  fontWeight: "800",
                  color: "#DC2626",
                }}
              >
                {stats.pendingOrders}
              </h3>

              <p
                style={{
                  marginBottom: "0",
                  fontWeight: "600",
                }}
              >
                Pending Orders
              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div
              style={{
                background: "#FEF3C7",
                padding: "25px",
                borderRadius: "18px",
              }}
            >

              <h3
                style={{
                  fontWeight: "800",
                  color: "#D97706",
                }}
              >
                {stats.confirmedOrders}
              </h3>

              <p
                style={{
                  marginBottom: "0",
                  fontWeight: "600",
                }}
              >
                Confirmed Orders
              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div
              style={{
                background: "#DBEAFE",
                padding: "25px",
                borderRadius: "18px",
              }}
            >

              <h3
                style={{
                  fontWeight: "800",
                  color: "#2563EB",
                }}
              >
                {stats.shippedOrders}
              </h3>

              <p
                style={{
                  marginBottom: "0",
                  fontWeight: "600",
                }}
              >
                Shipped Orders
              </p>

            </div>

          </div>

        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "30px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >

            <h4
              style={{
                fontWeight: "700",
                color: "#111827",
              }}
            >
              Recent Orders
            </h4>

            <button
              onClick={() =>
                navigate("/admin/orders")
              }
              style={{
                background: "#2563EB",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                borderRadius: "10px",
                fontWeight: "600",
              }}
            >
              View All
            </button>

          </div>

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>

                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Product</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>

              </thead>

              <tbody>

                {orders.map((item) => (

                  <tr key={item._id}>

                    <td>
                      {item.user?.name}
                    </td>

                    <td>
                      {
                        item.shippingAddress?.phone
                      }
                    </td>

                    <td>
                      {
                        item.orderItems[0]?.name
                      }
                    </td>

                    <td>

                      <span
                        style={{
                          background:
                            item.status ===
                            "delivered"
                              ? "#D1FAE5"
                              : item.status ===
                                "shipped"
                              ? "#DBEAFE"
                              : item.status ===
                                "confirmed"
                              ? "#FEF3C7"
                              : "#FEE2E2",

                          color:
                            item.status ===
                            "delivered"
                              ? "#065F46"
                              : item.status ===
                                "shipped"
                              ? "#1D4ED8"
                              : item.status ===
                                "confirmed"
                              ? "#92400E"
                              : "#991B1B",

                          padding: "6px 14px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: "600",
                          textTransform:
                            "capitalize",
                        }}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td
                      style={{
                        fontWeight: "700",
                        color: "#2563EB",
                      }}
                    >
                      ₹{item.totalPrice}
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

export default Dashboard;