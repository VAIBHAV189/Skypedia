const route=require('express').Router()
const Users=require('../passportDb').Users
const passport=require('../passport')

route.get('/login',(req,res)=>{
    res.render("login")
})


route.get('/signUp',(req,res)=>{
    res.render("signUp")
})

route.post('/signUp',(req,res)=>{
    Users.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    }).then((newUser)=>{
        res.redirect('/root/login')
    })
})

route.post('/login',passport.authenticate('local',{
    failureRedirect:'/root/login',
    successRedirect:'/'
}))

module.exports={
    route
}