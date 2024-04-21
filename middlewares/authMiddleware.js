var jwt = require('jsonwebtoken');
const tokenBlacklist = require('../utils/tokenBlacklist');

module.exports =  (req,res,next)=>{
    let decodedToken;
    try{
        const token = req.headers["authorization"].split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authorization token missing' });
        }
        if (tokenBlacklist.has(token)) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            throw new Error('Not authenticated');
        }

        req.body.id = decodedToken.id;
        next();
    }catch(error) {
        console.log(error);
        next(error);
    }
}