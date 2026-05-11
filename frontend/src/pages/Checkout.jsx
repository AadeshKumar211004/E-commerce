import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // 🔥 GET USER PHONE
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("user/profile");
        setForm((prev) => ({
          ...prev,
          phone: res.data.phone,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {

  // 🔴 VALIDATION
  if (!form.address || !form.city || !form.postalCode || !form.country) {
    alert("Please fill all address fields");
    return;
  }

  try {
    await API.post("order/checkout", {
      shippingAddress: {
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
      },
    });

    alert("Order placed successfully 🎉");
    navigate("/order-success");

  } catch (error) {
    alert("Failed to place order ❌");
  }
};
  return (
    <div
      className="container d-flex justify-content-center"
      style={{ marginTop: "100px", marginBottom: "60px" }}
    >
      <div className="card p-4 shadow" style={{ width: "650px" }}>

        <h4 className="mb-3 text-center" style={{ color: "#C8A96A" }}>
          Checkout
        </h4>

        {/* ADDRESS */}
        <div className="mb-3">
          <label>Address</label>
          <input
            className="form-control"
            name="address"
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>City</label>
            <input
              className="form-control"
              name="city"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Postal Code</label>
            <input
              className="form-control"
              name="postalCode"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label>Country</label>
          <input
            className="form-control"
            name="country"
            onChange={handleChange}
          />
        </div>

        {/* PHONE (AUTO + DISABLED) */}
        <div className="mb-3">
          <label>Phone Number</label>
          <input
            className="form-control"
            value={form.phone}
            disabled
          />
        </div>

        {/* COD */}
        <div className="mb-3">
          <label>Payment Method</label>
          <input
            className="form-control"
            value="Cash on Delivery (COD)"
            disabled
          />
        </div>

        {/* BUTTON */}
        <button
          className="btn w-100 mt-2"
          style={{
            backgroundColor: "#1A1A1A",
            color: "#F5F2EB",
          }}
          onClick={placeOrder}
        >
          Place Order
        </button>

      </div>
    </div>
  );
}

export default Checkout;