import {
  FaIndustry,
  FaSearch,
  FaTruck,
  FaPencilRuler,
  FaUserTie,
  FaBoxes,
} from "react-icons/fa";

function Services() {
  const services = [
    { name: "Manufacturing", icon: <FaIndustry /> },
    { name: "Sourcing", icon: <FaSearch /> },
    { name: "Logistics", icon: <FaTruck /> },
    { name: "Design", icon: <FaPencilRuler /> },
    { name: "Consulting", icon: <FaUserTie /> },
    { name: "Distribution", icon: <FaBoxes /> },
  ];

  return (
    <section
      style={{
        padding: "80px 0",
        background: "linear-gradient(180deg, #EFF6FF, #ffffff)",
      }}
    >
      <div className="container text-center">

        {/* 🔷 HEADING */}
        <h2
          style={{
            fontWeight: "700",
            color: "#111827",
          }}
        >
          Why Choose Us
        </h2>

        <p
          style={{
            color: "#6B7280",
            marginBottom: "50px",
          }}
        >
          We deliver high-quality services to help your business grow faster.
        </p>

        {/* 🔥 CARDS */}
        <div className="row g-4">
          {services.map((item, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              
              <div
                style={{
                  padding: "30px",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.08)";
                }}
              >
                {/* 🔵 ICON */}
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    margin: "0 auto 15px",
                    borderRadius: "50%",
                    background: "#EFF6FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    color: "#2563EB",
                  }}
                >
                  {item.icon}
                </div>

                {/* 🏷 TITLE */}
                <h5
                  style={{
                    color: "#111827",
                    fontWeight: "600",
                  }}
                >
                  {item.name}
                </h5>

                {/* 📄 TEXT */}
                <p
                  style={{
                    color: "#6B7280",
                    fontSize: "14px",
                  }}
                >
                  Professional {item.name.toLowerCase()} solutions tailored for your business.
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;