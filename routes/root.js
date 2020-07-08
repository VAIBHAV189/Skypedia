const route=require('express').Router()
const Users=require('../passportDb').Users
const passport=require('../passport')

//---------------------------------------------Login Handler----------------------------------------//
route.get('/login',(req,res)=>{
    res.render("login")
})

route.post('/login',passport.authenticate('local',{
    failureRedirect:'/root/login',
    successRedirect:'/'
}))

//-------------------------------------------SignUp Handler----------------------------------------//
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

//----------------------------------------------------Logout Handler-------------------------------------------//

route.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

//---------------------------------------------------Check login status---------------------------------------//
route.get('/username',(req,res)=>{
    let obj = req.user;
    if(req.user!=undefined)
    {   
        obj = {};
        obj.username = req.user.username;
        obj.login = "true"
    }
    else
    {
        obj = {};
        obj.login = "false";
    }
    res.send(obj)
})

//--------------------------------------------------Error Page----------------------------------------------//
route.get("/*",(req,res)=>{
    res.render('errorPage')
})

module.exports={
    route 
}