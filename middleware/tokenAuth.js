const jwt = require("jsonwebtoken")
require("dotenv").config();

const tokenAuth = function(req,res,next){
    if(req.headers.authorization){
    
        const token =req.headers.authorization.split(" ").pop();
        jwt.verify(token, process.env.TOKEN_KEY,function(err,data){
            if(err){
                console.log(err)
                return res.status(403).send("invalid token")
            } else {
                console.log("success");
                req.user = data;
                next()
            }
        })
    } else {
        return res.status(403).send("include your token")
    }
}

module.exports = tokenAuth