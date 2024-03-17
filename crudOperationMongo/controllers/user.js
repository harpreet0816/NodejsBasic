const User = require("../models/user");

async function handleGetAllUsers(req, res){
    const allDbUsers = await User.find({});
    return res.json(allDbUsers)
//    const html = `<ul>${
//     allDbUsers.map((user)=>`<li>${user.firstName} - ${user.email}</li>`).join("")
//    }</ul>`
//    res.send(html);
}
async function handleCreateUser (req, res){
    const body = req.body;
    if(!body || !body.firstName || !body.lastName || !body.email || !body.gender) return res.status(400).json({error: "some field are missing"});
    const newUser = await User.create({
     firstName: body.firstName,
     lastName: body.lastName,
     email: body.email,
     gender: body.gender,
     jobTitle: body.jobTitle
    })
    return res.status(201).json({"user-Created": newUser})
 }

 async function handleGetUserById(req, res){
    const user = await User.findById(req.params.id);
    if(!user) return res.status(400).json({"error": "Unable to find User"})
    return res.status(200).json({user})
 }

 async function handleUpdateUserById(req, res){
    const user = await User.findByIdAndUpdate(req.params.id, {lastName: "hero"});
    if(!user) return res.status(404).json({error: "User not found"});
    return res.status(202).json(user)

 }

 async function handleDeleteUserById(req, res){
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user) return res.status(404).json({error: "User not found"});
    return res.status(202).json(user)
 } 

 module.exports = {
    handleCreateUser,
    handleGetAllUsers,
    handleGetUserById,
    handleDeleteUserById,
    handleUpdateUserById
 }