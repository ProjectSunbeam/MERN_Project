const express = require('express')
const cryptojs = require('crypto-js')
const JWT = require('jsonwebtoken')
const pool = require('../db/pool')
const result = require('../utils/createResult')
const config = require('../utils/config')

const router = express.Router()

router.post('/signup',(req,res) =>{
    const {name , email, password , mobile} = req.body
    const sql = `INSERT INTO users (name , email, password , mobile) values (?,?,?,?)`
    const hashedPassword = cryptojs.SHA256(password).toString()
    pool.query(sql,[name , email, hashedPassword , mobile],(error,data) =>{
        res.send(result.createResult(error,data))
    })
})

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
                email : user.email
            }
            const token = JWT.sign(payload, config.SECRET)
            const userData = {
                name : user.name,
                mobile : user.mobile,
                token
            }
            res.send(result.createResult(null,userData))
        }
    })
})

router.get('/', (req, res) => {
    const email = req.headers.email
    const sql = `SELECT * FROM users WHERE email = ?`
    pool.query(sql, [email], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.delete('/',(req,res)=>{
    const uid = req.headers.uid
    const sql =  `delete from users where uid = ?`
    pool.query(sql,[uid],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

module.exports = router;