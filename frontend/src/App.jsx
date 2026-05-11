import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import About from "./pages/About"
import Login from "./pages/UserLogin"
import Cart from "./pages/Cart"
import AllProducts from "./pages/AllProducts"
import Order from "./pages/Order"
import { AuthProvider } from "./context/AuthContext"
import UserRegister from "./pages/UserRegister"
import ForgotPassword from "./pages/ForgotPassword"
import Checkout from "./pages/Checkout"
import OrderSuccess from "./pages/OrderSuccess"
import MyOrder from "./pages/MyOrder"
import ProductDetails from "./pages/ProductDetails"
import Dashboard from "./pages/Dashboard"
import ManageProducts from "./pages/ManageProducts"
import EditProduct from "./pages/EditProduct"
import AddProduct from "./pages/AddProduct"
import ManageOrders from "./pages/ManageOrders"

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/order-success" element={<OrderSuccess/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/orders" element={<MyOrder/>}/>
            <Route path="/products" element={<AllProducts />} />
            <Route path="/product/:id" element={<ProductDetails/>} />
            <Route path="/orders" element={<Order />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/edit-product/:id" element={<EditProduct />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
          </Routes>
        <Footer/>
    </BrowserRouter>
    </AuthProvider>

  )
}

export default App
