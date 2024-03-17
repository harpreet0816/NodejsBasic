const express = require("express");
const app = express();
const {connectMongoDB} = require("./connection")
const userRouter = require("./routers/user");
const {logReqRes} = require("./middlewares");

connectMongoDB("mongodb://127.0.0.1:27017/CrudPiyus").then(()=>console.log("database is connected"));

app.use(express.json());
app.use(express.urlencoded({extended: false}))
// console.log(logReqRes("url"))
app.use(logReqRes('log.txt'))
app.use("/user", userRouter)

app.get('/', (req, res)=>{
    res.send("please visit /users")
})


app.listen(3000, ()=> console.log("app is listening at port 3000"))