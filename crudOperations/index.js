const fs = require("fs");
const express = require("express");
const users = require("./MOCK_DATA.json")
const app = express();

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=>{
    res.send("please visit /users")
})

app.get("/users", (req, res)=>{
    // console.log(users.map((user)=>user.id).join(""))
   const html = `<ul>${
    users.map((user)=>`<li>${user.first_name}</li>`).join("")
   }</ul>`
   res.send(html);
})
app.post("/users",(req, res)=>{
    const body = {...req.body, id: users.length + 1}
    console.log(body)
    users.push(body)
    // JSON.stringify(users, null, 2) users is data to write, null is to include all , if we write id and first name then only writes id and first name in file and 2 is for spacing also in nested childs.
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err, data)=>{
        if (err) return res.end("error while writing to file")
        console.log(data, "---")
        res.send(`success new item added with id ${users.length}`)
    })
})
//dyanmic path parameter by using :id
app.route("/users/api/user/:id").get((req, res)=>{
    const id = req.params.id;
    console.log("===",id);
    // const user = users.filter((user)=> user.id == id && user )  // return array with object
    const user = users.find((user)=> user.id == id && user )  // return only object
    res.send(user)
    // const one = await users.findOne({id: req.query.id});
    // res.send(one)
})
.patch((req, res)=>{
    const id = req.params.id;
    const user = users.find((user)=> user.id == id  );
    if(!user) return res.end("failed to get data, either id is correct or some other issue");
    user.first_name = "singh";
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        res.send(`success : id: ${user.id} first name changed to:-  ${user.first_name}`);
    });
})
.delete((req, res)=>{
    const id = req.params.id;
    const index = users.findIndex((user) => user.id == id);

    if (index === -1) {
        return res.status(404).end("Failed to get data. Either the ID is incorrect or some other issue.");
    }

    const deletedUser = users.splice(index, 1)[0]; //user.splice(index, how many indexes to delate) return array using [0] to give only object

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        res.send(`Success: User with ID ${deletedUser.id} is deleted now.`);
    });
})
app.listen(3000, ()=> console.log("app is listening at port 3000"))