import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

import { Form, Button } from "react-bootstrap";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#1A1A1A", color: "#F5F2EB" }}>
      <div className="container py-5">

        {/* 🔹 TOP SECTION */}
        <div className="row gy-4">

          {/* LOGO */}
          <div className="col-lg-4 col-md-6">
            <img
              src="/logo.jpeg"
              alt="logo"
              style={{ height: "45px", marginBottom: "15px", borderRadius:"70px" }}
            />

            <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
              We provide premium products and business solutions worldwide with quality and trust.
            </p>

            {/* SOCIAL */}
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaLinkedinIn /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="list-unstyled footer-text">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-heading">Services</h6>
            <ul className="list-unstyled footer-text">
              <li><a href="#">Manufacturing</a></li>
              <li><a href="#">Sourcing</a></li>
              <li><a href="#">Logistics</a></li>
              <li><a href="#">Consulting</a></li>
            </ul>
          </div>

          {/* CONTACT FORM (RIGHT SIDE) */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-heading">Contact Us</h6>

            <Form>
              <Form.Control
                type="text"
                placeholder="Your Name"
                className="mb-2 footer-input"
              />

              <Form.Control
                type="email"
                placeholder="Email Address"
                className="mb-2 footer-input"
              />

              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Your Message"
                className="mb-2 footer-input"
              />

              <Button className="w-100 footer-btn">
                Send Message
              </Button>
            </Form>
          </div>

        </div>

        {/* 🔥 COMPANY DETAILS (FULL WIDTH BELOW) */}
        <div className="row mt-4 pt-3 border-top border-secondary">

          <div className="col text-center footer-contact">

            <span><FaMapMarkerAlt /> 123 Business Street, Noida, India</span>

            <span><FaPhone /> +91 9876543210</span>

            <span><FaEnvelope /> support@myshop.com</span>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="text-center mt-3">
          <p style={{ fontSize: "14px" }}>
            © 2026 MyShop. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;