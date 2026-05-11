const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const app = express();
const userRoutes = require("./routes/userRoutes");
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/product", productRoutes );
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes );

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    // console.log(`server is running on port ${PORT}`);
    try{
        connectDB().then(()=>{
            console.log(`MongoDB connected and Server is running on port ${PORT}`);
        })
    }catch(err){
        console.error(`Error : ${err.message}`);
        process.exit(1);
    }
})