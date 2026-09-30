import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Product from "./model/Product.js";

dotenv.config();
//const app =express();

import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);





const app = express();
 app.use(express.json());
 app.use(cors({
  origin:["http://localhost:5173"],
  methods:["GET","POST","PUT","DELETE"]
 }),
);

async function ConnectDB() {
  try{
    await mongoose.connect(process.env.MONGOOB_URI);
    console.log("MongoDB connected");
  }  catch(error){
    console.error("MongoDB connection Error:",error);
  }
}
ConnectDB();

let products = [
  {
    id: 1,
    name: "Corsair HS45 Earbuds",
    price: 4500,
    imageUrl: "https://techmatched.pk/wp-content/uploads/2024/05/4-13.png",
    desc: "A comfortable and high-quality gaming.",
  },
  {
    id: 2,
    name: "RTX 3060",
    price: 93000,
    imageUrl:
      "https://static.wbx.pk/files/2603/Images/14-czone.com.pk-1540-12831-250122082031-2603-2261410-231124021614482.jpg",
    desc: "A powerful graphics card from nvidia.",
  },
];

app.get("/products",async (req, res)=>{
  try{
    const products=await Product.find();
    res.json(products);
  }catch(error){
    res.status(500).json({message: "Error fetching products"});
  }
    

});

app.post("/products", async (req, res) => {
  try{
      
  const newProductFeild = req.body;
    const newProduct= new Product(newProductFeild);
    await newProduct.save();
  res.status(201).json(newProduct);
} catch(error){
  res.status(500).json({message: "Error creating products", error:error});
}
  


});


app.put("/products/:id",async(req,res)=>{
        try{
          const {id}=req.params;
          const updateProductFields =req.body;
          const updateProduct =await Product.findOneAndUpdate(
            {id},
            updateProductFields,
            {new:true},
          );
          res.json(updateProduct);
        }catch(error){
          res.status(500).json({message:"Erroe updating Product"});
        }
});


app.delete("/products/:id", async(req, res) => {
  try{
    const { id } = req.params;
    await Product.findOneAndDelete({id:id});
    res.status(204).send();
  } catch(error){
    res.status(500).json({message:"Error Deleting Product"});
  }
  
});

app.listen(5050, ()=>{
    console.log("Server running on port 5050")
})