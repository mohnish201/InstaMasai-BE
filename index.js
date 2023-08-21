const express = require("express");
const { connection } = require("./db");
const { PostRoute } = require("./Routes/PostRoute");
const { UserRoute } = require("./Routes/UserRoute");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors())
app.use("/users", UserRoute)
app.use("/posts", PostRoute)



app.get("/", (req, res)=> {
    res.json("This is home page")
})

app.listen("8000", async()=> {
    try {
        await connection;
        console.log("Connected to DB")
        console.log("Server is Running at port 8000")
    } catch (error) {
        console.log(error)
    }
})