const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const cookieParser = require('cookie-parser')

//Mongo db
const connectDb = require("./conection.js");
const URL = require('./models/url.js');

//Routers
const router = require('./routers/url.js')
const FrontEndUrl = require('./routers/frontEndUrl.js');
const userRouter = require('./routers/user.js');

//import custom middlewares
const {restrictToLoggedinUserOnly, checkAuth} = require('./middlewares/auth.js')

//midllewares
app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

//connect database
connectDb("mongodb://127.0.0.1:27017/urlShortnerAuth").then(()=>console.log("database connected"))

app.use('/url',restrictToLoggedinUserOnly, router);
app.use('/',checkAuth, FrontEndUrl);
app.use('/user', userRouter)


app.listen(3000, ()=>{
    console.log("app is running at port 3000");
})