import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import API from "../services/api";

function ManageOrders() {

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const deleteOrder = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/order/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Order Deleted");

      fetchOrders();

    } catch (error) {

      console.log(error);

    }
  };


    const updateStatus = async (id, status) => {

  try {

    const token = localStorage.getItem("token");

    const res = await API.put(
      `/order/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrders((prevOrders) =>
      prevOrders.map((item) =>
        item._id === id
          ? {
              ...item,
              status: res.data.status,
            }
          : item
      )
    );

  } catch (error) {

    console.log(error);

  }
};

  const filteredOrders = orders.filter((item) =>
    item.user?.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
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
            marginBottom: "40px",
          }}
        >

          <h2
            style={{
              fontWeight: "800",
              color: "#111827",
            }}
          >
            Manage Orders
          </h2>

          <p
            style={{
              color: "#6B7280",
              marginTop: "10px",
            }}
          >
            Manage customer orders and status.
          </p>

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
              placeholder="Search customer..."
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
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredOrders.map((item) => (

                  <tr key={item._id}>

                    <td
                      style={{
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      {item.user?.name}
                    </td>

                    <td>
                      {item.phone}
                    </td>

                    <td
                      style={{
                        maxWidth: "200px",
                      }}
                    >
                      {item.shippingAddress?.address + " " + item.shippingAddress?.city + " " +item.shippingAddress?.postalCode}
                    </td>

                    <td>
                      {item.orderItems[0].name}
                    </td>

                    <td
                      style={{
                        color: "#2563EB",
                        fontWeight: "700",
                      }}
                    >
                      ₹{item.totalPrice}
                    </td>

                    <td>

                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateStatus(
                            item._id,
                            e.target.value
                          )
                        }
                        style={{
                          padding: "8px 12px",
                          borderRadius: "8px",
                          border: "1px solid #D1D5DB",
                          outline: "none",
                          cursor: "pointer",
                        }}
                      >

                        <option value="pending">
                          Pending
                        </option>
                        
                        <option value="confirmed">
                          Confirmed
                        </option>

                        <option value="shipped">
                          Shipped
                        </option>

                        <option value="delivered">
                          Delivered
                        </option>

                      </select>

                    </td>

                    <td>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >

                        <button
                        onClick={() => setSelectedOrder(item)}
                        style={{
                            background: "#2563EB",
                            color: "#fff",
                            border: "none",
                            padding: "10px 14px",
                            borderRadius: "8px",
                        }}
                        >
                        <FaEye />
                        </button>

                        <button
                          onClick={() =>
                            deleteOrder(item._id)
                          }
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
      {
  selectedOrder && (

    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "999",
        padding: "20px",
        // paddingTop:"100px",
        // paddingBottom:"50px"
      }}
    >

      <div
        style={{
          width: "700px",
          maxHeight: "85vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          marginTop:"50px"
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

          <h3
            style={{
              fontWeight: "800",
              color: "#111827",
              marginBottom: "0",
            }}
          >
            Order Details
          </h3>

          <span
            style={{
              background:
                selectedOrder.status === "delivered"
                  ? "#D1FAE5"
                  : selectedOrder.status === "shipped"
                  ? "#DBEAFE"
                  : "#FEF3C7",

              color:
                selectedOrder.status === "delivered"
                  ? "#065F46"
                  : selectedOrder.status === "shipped"
                  ? "#1D4ED8"
                  : "#92400E",

              padding: "8px 14px",
              borderRadius: "20px",
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            {selectedOrder.status}
          </span>

        </div>

        <div
          style={{
            background: "#F9FAFB",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "25px",
          }}
        >

          <h5
            style={{
              marginBottom: "20px",
              fontWeight: "700",
              color: "#111827",
            }}
          >
            Customer Details
          </h5>

          <p>
            <strong>User ID:</strong>{" "}
            {selectedOrder.user?._id}
          </p>

          <p>
            <strong>Name:</strong>{" "}
            {selectedOrder.user?.name}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {selectedOrder.shippingAddress?.phone}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {selectedOrder.shippingAddress?.address}
          </p>

          <p>
            <strong>City:</strong>{" "}
            {selectedOrder.shippingAddress?.city}
          </p>

          <p>
            <strong>Postal Code:</strong>{" "}
            {selectedOrder.shippingAddress?.postalCode}
          </p>

          <p>
            <strong>Country:</strong>{" "}
            {selectedOrder.shippingAddress?.country}
          </p>

        </div>

        <div
          style={{
            background: "#F9FAFB",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "25px",
          }}
        >

          <h5
            style={{
              marginBottom: "20px",
              fontWeight: "700",
              color: "#111827",
            }}
          >
            Ordered Products
          </h5>

          {
            selectedOrder.orderItems.map((item, index) => (

              <div
                key={index}
                style={{
                  borderBottom: "1px solid #E5E7EB",
                  paddingBottom: "15px",
                  marginBottom: "15px",
                }}
              >

                <p>
                  <strong>Product ID:</strong>{" "}
                  {item.product}
                </p>

                <p>
                  <strong>Product Name:</strong>{" "}
                  {item.name}
                </p>

                <p>
                  <strong>Price:</strong> ₹
                  {item.price}
                </p>

                <p>
                  <strong>Quantity:</strong>{" "}
                  {item.quantity}
                </p>

              </div>

            ))
          }

        </div>

        <div
          style={{
            background: "#F9FAFB",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "25px",
          }}
        >

          <h5
            style={{
              marginBottom: "20px",
              fontWeight: "700",
              color: "#111827",
            }}
          >
            Payment Details
          </h5>

          <p>
            <strong>Total Price:</strong> ₹
            {selectedOrder.totalPrice}
          </p>

          <p>
            <strong>Payment Method:</strong>{" "}
            {selectedOrder.paymentMethod}
          </p>

          <p>
            <strong>Payment Status:</strong>{" "}
            {
              selectedOrder.isPaid
                ? "Paid"
                : "Not Paid"
            }
          </p>


        </div>

        <button
          onClick={() => setSelectedOrder(null)}
          style={{
            width: "100%",
            background: "#2563EB",
            color: "#fff",
            border: "none",
            padding: "14px",
            borderRadius: "10px",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          Close
        </button>

      </div>

    </div>

  )
}
    </div>
  );
}

export default ManageOrders;