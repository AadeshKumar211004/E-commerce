import { useEffect, useState } from "react";
import API from "../services/api";
import { FaBoxOpen } from "react-icons/fa";

function MyOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await API.get("/order/myorder");
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  // 🎯 STATUS STEP
  const getStep = (status) => {
    if (status === "pending") return 1;
    if (status === "confirmed") return 2;
    if (status === "shipped") return 3;
    if (status === "delivered") return 4;
  };

  // 📅 DELIVERY DATE (+10 days)
  const getDeliveryDate = (createdAt) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + 10);
    return date.toDateString();
  };

  // 🟡 EMPTY UI
  if (orders.length === 0) {
    return (
      <div
        className="container d-flex flex-column justify-content-center align-items-center text-center"
        style={{ marginTop: "100px", marginBottom: "60px", minHeight: "60vh" }}
      >
        <FaBoxOpen
          size={70}
          style={{
            color: "#C8A96A",
            marginBottom: "20px",
            animation: "bounce 1.5s infinite",
          }}
        />

        <h4 style={{ color: "#1A1A1A" }}>No Orders Yet</h4>
        <p style={{ color: "#666" }}>
          You haven’t placed any orders. Start shopping now!
        </p>

        <button
          className="btn mt-3"
          style={{
            backgroundColor: "#1A1A1A",
            color: "#F5F2EB",
          }}
          onClick={() => (window.location.href = "/")}
        >
          Shop Now
        </button>

        {/* 🔥 ANIMATION */}
        <style>
          {`
            @keyframes bounce {
              0%,100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{ marginTop: "100px", marginBottom: "60px" }}
    >
      <h3 style={{ color: "#C8A96A" }} className="mb-4">
        My Orders
      </h3>

      {orders.map((order) => (
        <div key={order._id} className="card mb-4 p-3 shadow-sm">

          {/* 🔹 HEADER */}
          <div className="d-flex justify-content-between mb-3">
            <div>
              <strong>Order ID:</strong> {order._id}
              <br />
              <small>
                Placed on: {new Date(order.createdAt).toDateString()}
              </small>
            </div>

            <div>
              <strong>Status:</strong>{" "}
              <span style={{ color: "#C8A96A" }}>
                {order.status}
              </span>
            </div>
          </div>

          {/* 🔥 AMAZON STYLE TIMELINE */}
          <div className="d-flex align-items-center mb-3 position-relative">

            {["Pending", "Confirmed", "Shipped", "Delivered"].map((step, i) => {
              const active = getStep(order.status) > i;

              return (
                <div key={i} className="flex-fill text-center position-relative">

                  {/* LINE */}
                  {i !== 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "-50%",
                        width: "100%",
                        height: "3px",
                        backgroundColor:
                          getStep(order.status) > i ? "#C8A96A" : "#ddd",
                        zIndex: 0,
                      }}
                    />
                  )}

                  {/* DOT */}
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      margin: "auto",
                      backgroundColor: active ? "#C8A96A" : "#ccc",
                      zIndex: 1,
                      position: "relative",
                    }}
                  />

                  <small>{step}</small>
                </div>
              );
            })}
          </div>

          {/* 🔹 ITEMS */}
          {order.orderItems.map((item, i) => (
            <div key={i} className="d-flex align-items-center mb-2">

              <div className="flex-grow-1">
                <strong>{item.name}</strong>
                <br />
                <small>Qty: {item.quantity}</small>
              </div>

              <div>₹{item.price}</div>

            </div>
          ))}

          {/* 🔹 DELIVERY */}
          <div className="mt-3">
            <small>
              Expected Delivery:{" "}
              <strong>{getDeliveryDate(order.createdAt)}</strong>
            </small>
          </div>

        </div>
      ))}
    </div>
  );
}

export default MyOrder;