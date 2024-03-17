const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path")
const router = require('./routers/url.js')
const FrontEndUrl = require('./routers/frontEndUrl.js')
const connectDb = require("./conection.js");
const URL = require('./models/url.js');

app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))
app.use(express.json());
app.use(express.urlencoded({extended: false}))
connectDb("mongodb://127.0.0.1:27017/urlShortner").then(()=>console.log("database connected"))

app.use('/url', router);
app.use('/', FrontEndUrl)


app.listen(3000, ()=>{
    console.log("app is running at port 3000");
})