const user = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const {setUser, getUser} = require('../service/auth')
async function handleSignUp(req, res){
    const {name, email, password} = req.body;
    try {
        const newUser = await user.create({ name, email, password });
        console.log("User in handle signup", newUser);
        res.redirect("/login");
    } catch (error) {
            return res.status(400).json({ error: 'Email already exists' });
    };
};

async function handleLogin(req, res) {
    const { email, password } = req.body;

    try {
        // Attempt to find the user with the provided email and password
        const foundUser = await user.findOne({ email, password });
        // console.log("User====", foundUser);
        
        // If no user is found, return an error response
        if (!foundUser) {
            return res.status(404).json({ error: "User not found" });
        }
        
        // If user is found, return a success response
        const sessionId = uuidv4();
        setUser(sessionId, foundUser);
        res.cookie("uid", sessionId);
        return res.redirect('/');
    } catch (error) {
        console.error("Error in handleLogin:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    handleSignUp,
    handleLogin
}