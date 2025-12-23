const result = require('./createResult')

function isAdmin(req,res,next){
    if(req.user.role != "admin")
       return res.send(result.createResult('Admin access only'))
    next()
}

function isStudent(req,res,next){
    if(req.user.role != "student")
       return res.send(result.createResult('student access only'))
    next()
}

module.exports = {isAdmin,isStudent};  