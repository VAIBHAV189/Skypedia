const route=require('express').Router()
const Users=require('../passportDb').Users
const passport=require('../passport')
const express=require('express')


route.get('/login',(req,res)=>{
    // console.log(req.user)
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
// route.post('/login',passport.authenticate('local'),function(req,res){
//     console.log(req.user)
//     res.redirect('/');
// })

route.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

route.post('/username',(req,res)=>{
    if(!req.user)
    {
        return res.send(null)
    }
    return res.send(req.user.username)
})
module.exports={
    route 
}