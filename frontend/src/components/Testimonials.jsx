import { FaStar } from "react-icons/fa";

function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      text: "Excellent service and fast delivery. Highly recommended!",
      rating: 5,
    },
    {
      name: "Anjali Verma",
      text: "Very professional team and quality products.",
      rating: 4,
    },
    {
      name: "Amit Kumar",
      text: "Best sourcing and logistics support I have ever used.",
      rating: 5,
    },
  ];

  return (
    <section
      style={{
        padding: "120px 0",
        background: "linear-gradient(180deg, #ffffff, #EFF6FF)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container text-center">

        {/* 🔷 HEADING */}
        <h2
          style={{
            fontWeight: "800",
            color: "#111827",
            fontSize: "34px",
          }}
        >
          Loved by Businesses Worldwide 💙
        </h2>

        <p
          style={{
            color: "#6B7280",
            marginBottom: "60px",
          }}
        >
          Real feedback from our happy clients
        </p>

        {/* 🔥 CENTER FOCUS CARD */}
        <div className="d-flex justify-content-center mb-5">
          <div
            style={{
              maxWidth: "500px",
              padding: "40px",
              borderRadius: "20px",
              background: "#ffffff",
              boxShadow: "0 25px 60px rgba(0,0,0,0.12)",
              transform: "scale(1.05)",
            }}
          >
            {/* ⭐ */}
            <div className="mb-3">
              {[...Array(reviews[0].rating)].map((_, i) => (
                <FaStar key={i} color="#FBBF24" />
              ))}
            </div>

            <p
              style={{
                fontSize: "16px",
                color: "#374151",
                fontStyle: "italic",
              }}
            >
              “{reviews[0].text}”
            </p>

            <h6
              style={{
                marginTop: "15px",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              — {reviews[0].name}
            </h6>
          </div>
        </div>

        {/* 🔥 SIDE CARDS */}
        <div className="row g-4 justify-content-center">
          {reviews.slice(1).map((item, index) => (
            <div className="col-md-4" key={index}>
              <div
                style={{
                  padding: "25px",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                }}
              >
                <div className="mb-2">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} color="#FBBF24" />
                  ))}
                </div>

                <p
                  style={{
                    fontStyle: "italic",
                    color: "#374151",
                  }}
                >
                  “{item.text}”
                </p>

                <h6
                  style={{
                    marginTop: "10px",
                    fontWeight: "600",
                    color: "#111827",
                  }}
                >
                  — {item.name}
                </h6>
              </div>
            </div>
          ))}
        </div>

        {/* 📊 TRUST STATS */}
        <div
          className="d-flex justify-content-center gap-5 mt-5 flex-wrap"
        >
          <div>
            <h3 style={{ color: "#2563EB", fontWeight: "800" }}>1000+</h3>
            <p style={{ color: "#6B7280" }}>Happy Clients</p>
          </div>

          <div>
            <h3 style={{ color: "#F97316", fontWeight: "800" }}>500+</h3>
            <p style={{ color: "#6B7280" }}>Projects Completed</p>
          </div>

          <div>
            <h3 style={{ color: "#2563EB", fontWeight: "800" }}>4.9★</h3>
            <p style={{ color: "#6B7280" }}>Average Rating</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Testimonials;