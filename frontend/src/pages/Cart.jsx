import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash, FaShoppingCart } from "react-icons/fa";

function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  // 🔄 FETCH CART
  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ➕ ADD
  const increaseQty = async (id) => {
    await API.post("/cart", { productId: id, quantity: 1 });
    fetchCart();
  };

  // ➖ REMOVE QTY
  const decreaseQty = async (id) => {
    await API.post("/cart", { productId: id, quantity: -1 });
    fetchCart();
  };

  // ❌ DELETE ITEM
  const removeItem = async (id) => {
    await API.delete(`/cart/${id}`);
    fetchCart();
  };

  // 💰 TOTAL
  const totalPrice = cart?.items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 🟡 EMPTY CART UI
  if (!cart || cart.items.length === 0) {
    return (
      <div
        className="container d-flex flex-column justify-content-center align-items-center text-center"
        style={{ marginTop: "100px", marginBottom: "60px", minHeight: "60vh" }}
      >
        <FaShoppingCart
          size={60}
          style={{
            color: "#C8A96A",
            marginBottom: "20px",
            animation: "bounce 1.5s infinite",
          }}
        />

        <h4 style={{ color: "#1A1A1A" }}>Your cart is empty</h4>
        <p style={{ color: "#666" }}>
          Looks like you haven't added anything yet.
        </p>

        <button
          className="btn mt-3"
          style={{
            backgroundColor: "#1A1A1A",
            color: "#F5F2EB",
          }}
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>

        {/* 🔥 ANIMATION STYLE */}
        <style>
          {`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
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
      <h3 className="mb-4" style={{ color: "#C8A96A" }}>
        Shopping Cart
      </h3>

      <div className="row">

        {/* 🛒 ITEMS */}
        <div className="col-md-8">
          {cart.items.map((item) => (
            <div
              className="card mb-3 p-3 d-flex flex-row align-items-center shadow-sm"
              key={item._id}
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt=""
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />

              {/* DETAILS */}
              <div className="ms-3  flex-grow-1">
                <h6>{item.name}</h6>
                <p className="mb-1">₹{item.price}</p>

                {/* QUANTITY */}
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => decreaseQty(item.product._id)}
                  >
                    <FaMinus />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => increaseQty(item.product._id)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              {/* REMOVE */}
              <button
                className="btn btn-danger"
                onClick={() => removeItem(item.product._id)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        {/* 💰 SUMMARY */}
        <div className="col-md-4">
          <div className="card p-4 shadow">

            <h5>Total</h5>
            <h4 style={{ color: "#C8A96A" }}>₹{totalPrice}</h4>

            <button
              className="btn mt-3"
              style={{
                backgroundColor: "#1A1A1A",
                color: "#F5F2EB",
              }}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;