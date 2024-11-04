require('dotenv').config()

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next){
    let token = req.headers["authorization"];
    if(token)
    {
        token = token.split(" ")[1];
    
        if(!token) return res.sendStatus(403);
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.sendStatus(401) // unauthorized;
            req.user = user;
            next();
        })
    }
    else
    {
        return res.sendStatus(403);
    }
}

module.exports = { authenticateToken };