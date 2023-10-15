// updateUser function remains the same

const User = require("../models/user");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWTSEC, async (err, user) => {
            if (err) res.status(403).json("invalid token");
            req.user = user;
        
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated");
    }
};

const verifyAndAuthorizeToken = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id) {
            next();
        } else {
            res.status(403).json("you are restricted from performing this task");
        }
    });
}

const verifyAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
    
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({"message": "You are restricted from performing this task"});
        }
    });
}


module.exports = { verifyToken, verifyAndAuthorizeToken,verifyAndAdmin };
