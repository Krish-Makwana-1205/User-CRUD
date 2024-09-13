const jwt = require('jsonwebtoken');
const secret_key = "SeeKreet_Cev";
async function set_User(user){
    const payload = {
        name:user.email
    }
    return await new Promise((resolve, reject) => {
        jwt.sign(payload, secret_key, (err, token) => {
            if (err) return reject(err);
            resolve(token);
        });
    });
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