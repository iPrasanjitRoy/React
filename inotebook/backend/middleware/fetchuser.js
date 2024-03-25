const jwt = require('jsonwebtoken');
const JWT_SECRET = "PUTGOODWORDS";


// Defining A Middleware Function Named 'fetchuser' 
const fetchuser = (req, res, next) => {

    // Extracting The Token From The Request Header 
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please Authenticate Uisng Vaild Toekn 1" });

    }

    try {
        const data = jwt.verify(token, JWT_SECRET);   // Verifying The Token 
        req.user = data.user; // Storing The User Data In The Request Object 
        next();

    } catch (error) {
        res.status(401).send({ error: "Please Authenticate Uisng Vaild Toekn 2" });
    }
}


module.exports = fetchuser;