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
                // to check  weather role is workiing or not
                   console.log('Decoded token payload:', payload); 
                req.user = {
                    uid: payload.uid,
                    email:payload.email,
                    role:payload.role
                }

                next();

            } catch (ex) {
                res.send(result.createResult('Token is Invalid'));
            }
        }
    }
}

module.exports = authUser;