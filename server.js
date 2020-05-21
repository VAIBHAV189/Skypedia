const express=require('express')
const server=express()
const path=require('path')
const admin=require('./routes/admin').route
const root=require('./routes/root').route
const user=require('./routes/user').route
const session=require('express-session')
const passport=require('./passport.js')
const {db}=require('./passportDb')
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

server.use('/',express.static(path.join(__dirname,'./public')));
// server.use('/admin',express.static(path.join(__dirname,'public/admin')))
server.use('/user',express.static(path.join(__dirname,'public/user')))
server.use('/search',express.static(path.join(__dirname,'public/admin/Search')))
server.use('/delete',express.static(path.join(__dirname,'public/admin/Delete')))

server.use('/root',root)
server.use('/admin',admin)
server.use('/user',user)
server.listen(6979,()=>{
    console.log("Server started successfully at localhost:6979")
})
