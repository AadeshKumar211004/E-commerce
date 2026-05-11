import React from "react";

function Hero() {
  return (
    <section
      className="d-flex align-items-center"
      style={{
        background: "linear-gradient(135deg, #DBEAFE, #FFFFFF)",
        minHeight: "100vh", // 🔥 height increase
        position: "relative",
        overflow: "hidden",
        padding: "80px 0",
      }}
    >
      {/* 🔵 BACKGROUND BLOBS */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "300px",
          height: "300px",
          background: "#2563EB",
          opacity: "0.1",
          borderRadius: "50%",
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          bottom: "100px",
          right: "-80px",
          width: "250px",
          height: "250px",
          background: "#F97316",
          opacity: "0.1",
          borderRadius: "50%",
        }}
      ></div>

      <div className="container position-relative">
        <div className="row align-items-center">
          
          {/* LEFT TEXT */}
          <div className="col-lg-6 text-center text-lg-start">
            <h1
              className="fw-bold display-4"
              style={{
                color: "#111827",
                lineHeight: "1.2",
              }}
            >
              Elevate Your Business with{" "}
              <span style={{ color: "#2563EB" }}>
                Premium Solutions
              </span>
            </h1>

            <p
              className="mt-4"
              style={{
                color: "#4B5563",
                fontSize: "18px",
                maxWidth: "500px",
              }}
            >
              We provide manufacturing, sourcing, logistics and consulting
              services to grow your business globally with smart and scalable
              solutions.
            </p>

            <div className="mt-5 d-flex gap-3 justify-content-center justify-content-lg-start">
              
              {/* 🟠 PRIMARY BUTTON */}
              <button
                className="btn"
                style={{
                  backgroundColor: "#F97316",
                  color: "#fff",
                  padding: "12px 26px",
                  borderRadius: "10px",
                  border: "none",
                  fontWeight: "500",
                  boxShadow: "0 8px 20px rgba(249,115,22,0.3)",
                }}
              >
                Get Started
              </button>

              {/* 🔵 OUTLINE BUTTON */}
              <button
                className="btn"
                style={{
                  border: "2px solid #2563EB",
                  color: "#2563EB",
                  padding: "12px 26px",
                  borderRadius: "10px",
                  background: "transparent",
                  fontWeight: "500",
                }}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-6 text-center mt-5 mt-lg-0">
            <img
              src="/hero1.png"
              alt="hero"
              className="img-fluid"
              style={{
                maxHeight: "100%",
              }}
            />
          </div>
        </div>
      </div>

      {/* 🌊 WAVE DESIGN */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          lineHeight: 0,
        }}
      >
        <svg viewBox="0 0 1440 200">
          <path
            fill="#ffffff"
            d="M0,120C120,160,240,180,360,170C480,160,600,120,720,120C840,120,960,160,1080,170C1200,180,1320,160,1440,140V200H0Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}

export default Hero;