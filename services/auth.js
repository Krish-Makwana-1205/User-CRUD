const jwt = require('jsonwebtoken');
const secret_key = "SeeKreet_Cev";
async function set_User(user){
    const payload = {
        name:user.email
    }
    return await jwt.sign({
        name:user.email
    }, secret_key);
}

async function get_User(authHeader){
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (token == null) return null; 

    return jwt.verify(token, 'SeeKreet_Cev');
}

module.exports = {
    get_User,
    set_User
}