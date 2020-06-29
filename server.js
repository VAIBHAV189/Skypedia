const express=require('express')
const server=express()
const path=require('path')
const admin=require('./routes/admin').route
const root=require('./routes/root').route
const user=require('./routes/user').route
const session=require('express-session')
const passport=require('./passport.js')

server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(session({
    secret:'Myencoderstring',
    resave:false,
    saveUninitialized:true
}))

server.use(passport.initialize())
server.use(passport.session())

server.set("view engine","hbs")

server.use(express.static('public')); 

server.use('/user',user)
server.use('/root',root)
server.use('/admin',admin)

server.listen(6979,()=>{
    console.log("Server started successfully at localhost:6979")
})