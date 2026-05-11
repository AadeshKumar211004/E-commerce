import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function MyNavbar() {

  const { isLoggedIn, role, logout } = useAuth();

  return (
    <Navbar expand="lg" className="custom-navbar fixed-top ">
      <Container>
        {/* 🔹 LOGO */}
        <Navbar.Brand href="/">
          <img src="/logo.jpeg" alt="logo" height="40" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          {/* 🔹 LEFT LINKS */}
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>

            <NavDropdown title="Services" id="services-dropdown">
              <NavDropdown.Item href="#">Manufacturing</NavDropdown.Item>
              <NavDropdown.Item href="#">Sourcing</NavDropdown.Item>
              <NavDropdown.Item href="#">Buying</NavDropdown.Item>
              <NavDropdown.Item href="#">Logistics</NavDropdown.Item>
              <NavDropdown.Item href="#">Distribution</NavDropdown.Item>
              <NavDropdown.Item href="#">Design</NavDropdown.Item>
              <NavDropdown.Item href="#">Image</NavDropdown.Item>
              <NavDropdown.Item href="#">Consulting</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* 🔹 RIGHT SIDE */}
          <Nav className="align-items-center">
            
            {/* SEARCH */}
            <Form className="d-flex me-3">
              <Form.Control
                type="search"
                placeholder="Search"
                className="search-input"
              />
              <Button className="btn-search">Search</Button>
            </Form>

            {!isLoggedIn ? (
          
              <Nav.Link href="/login">Login</Nav.Link>

            ) : (
      
              <NavDropdown
                title={<FaUserCircle size={24} />}
                id="profile-dropdown"
                align="end"
              >


                {role === "user" && (
                  <>
                    <NavDropdown.Item href="/orders">
                      My Orders
                    </NavDropdown.Item>

                    <NavDropdown.Item href="/cart">
                      Cart
                    </NavDropdown.Item>
                  </>
                )}

                {role === "admin" && (
                  <>
                    <NavDropdown.Item href="/admin/dashboard">
                      Dashboard
                    </NavDropdown.Item>

                    <NavDropdown.Item href="/admin/products">
                      Manage Products
                    </NavDropdown.Item>

                    <NavDropdown.Item href="/admin/orders">
                      Manage Orders
                    </NavDropdown.Item>
                  </>
                )}

                <NavDropdown.Divider />

                {/* LOGOUT */}
                <NavDropdown.Item onClick={logout} href="/">
                  Logout
                </NavDropdown.Item>

              </NavDropdown>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;  