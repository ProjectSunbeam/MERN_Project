const express = require('express')
const cryptojs = require('crypto-js')
const JWT = require('jsonwebtoken')
const pool = require('../db/pool')
const result = require('../utils/createResult')
const config = require('../utils/config')
const authUser = require('../utils/auth')

const router = express.Router()

router.post('/signup', (req, res) => {
    const { name, email, password, mobile, role } = req.body;

    const hashedPassword = cryptojs.SHA256(password).toString();

    const sql = `
      INSERT INTO users (name, email, password, mobile, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    pool.query(
        sql,
        [name, email, hashedPassword, mobile, role || 'student'],
        (error, data) => {
            if (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.send(
                        result.createResult('Email already registered')
                    );
                }
                return res.send(result.createResult(error));
            }
            res.send(result.createResult(null, 'User registered successfully'));
        }
    );
});


router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    const hashedPassword = cryptojs.SHA256(password).toString()
    const sql =  `select * from users where email = ? and password = ?`
    pool.query(sql,[email,hashedPassword],(error,data)=>{
        if(error){
            res.send(result.createResult(error))
        }
        else if(data.length == 0){
            res.send(result.createResult("Invalid email or password"))
        }
        else{
            const user = data[0]
            
            const payload = {
                uid:user.uid,
                email : user.email,
                role : user.role
            }
            const token = JWT.sign(payload, config.SECRET)
            const userData = {
                name : user.name,
                mobile : user.mobile,
                role : user.role,
                token
            }
            res.send(result.createResult(null,userData))
        }
    })
})

router.get('/', authUser, (req, res) => {
    if (!req.user) {
        return res.send(result.createResult('Unauthorized'));
    }
    const email = req.user.email;
    const sql = `SELECT uid, name, email, mobile, role FROM users WHERE email = ?`;
    pool.query(sql, [email], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

router.delete('/',(req,res)=>{
    const uid = req.headers.uid
    const sql =  `delete from users where uid = ?`
    pool.query(sql,[uid],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

module.exports = router;