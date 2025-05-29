const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader?.startsWith('Bearer ')) return res.status(401).json({message: "Authorization token missing"});

        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            console.log("ERrr ", err)
            return res.status(401).json({ message: 'Invalid token' });
        }
    } catch (err) {
        console.log(err)
        res.send("Something went wrong")
    }
}

module.exports = authMiddleware;
