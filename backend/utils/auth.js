const jwt = require('jsonwebtoken');

const result = require('./createResult');
const config = require('./config');

function authUser(req,res,next){
    const path = req.url;
    if(path == '/users/signup' || path == '/users/signin')
        next();
    else{
        const token = req.headers.token;
        if(!token){
            res.send(result.createResult('Token is missing'));
        }
        else{
            try {
                const payload = jwt.verify(token, config.SECRET);

                req.headers.uid = payload.uid;
                req.headers.email = payload.email;
+
                next();

            } catch (ex) {
                res.send(result.createResult('Token is Invalid'));
            }
        }
    }
}

module.exports = authUser;