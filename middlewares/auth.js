const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).json({
        success: 0,
        message: "Invalid Email and Password"
      });

    try {
        const decode = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decode;
        next();
    }
    catch(ex) {
        res.status(400).json({
            success: 0,
            message: "Invalid Email and Password"
          });;
    }
}
