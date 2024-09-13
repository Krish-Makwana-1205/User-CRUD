const express = require('express');
const jwt = require('jsonwebtoken');
const {logging} = require('./middleware/winston_log');
const app = express();
const port = 3000; // or any port you prefer

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (token == null) return res.sendStatus(401); // No token found

    jwt.verify(token, 'SeeKreet_Cev', (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token

        req.user = user; // Attach user to the request
        next();
    });
};


app.use(express.json());

app.get('/protected', authenticateToken, logging, (req, res) => {
    res.send('This is a protected route');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
