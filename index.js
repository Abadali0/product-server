import express from "express";
const app=express()

        //Get API Create 

app.get("/working",(req,res)=>{
        res.send("I am working Perfectly")
})
app.get("/profile",(req,res)=>{
        res.status(200).json({
            name:"Abad Ali",
            userId:"202438"
            
        })
})
const PORT=5050

app.listen(PORT,()=>{
    console.log("server is Running on PORT 5050")
})