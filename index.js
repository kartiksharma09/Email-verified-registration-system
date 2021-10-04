const express = require("express");
const connectDB = require("./config/db");
const app  =  express();

app.use(express.json({extended:false}));

//DB connection
connectDB()


app.use("/api/user",require("./routes/signup"));
app.use("/api/user",require("./routes/login"));
app.use("/api/user",require("./routes/profile"))


app.use((err,req,res,next)=>{
    res.status(err.status || 500).json(err)
})

const PORT = 8008 || process.env.PORT

app.listen(PORT,()=>{
    console.log("server started sir...")
})