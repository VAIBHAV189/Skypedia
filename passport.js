const passport=require('passport')
const localStrategy=require('passport-local').Strategy
const Users=require('./passportDb.js').Users

// passport.serializeUser(function(user,done){
//     done(null,user.username)
// })

passport.serializeUser(
    function(user,done){
        done(null,user.id) 
    }
)
// passport.deserializeUser(function(username,done){
//     Users.findOne({
//         username:username 
//     }).then((user)=>{
//         if(!user){
//             return done(new Error("No such user "))
//         }
//         return done(null,user)
//     }).catch((err)=>{
//         done(err)
//     })

// })
passport.deserializeUser(
    function(userId,done){
        Users.findByPk(userId).then((user)=>{
            done(null,user) 
        }).catch(done)
    }
)

// passport.use(new localStrategy(function(username,password,done){
//     Users.findOne({
//         where:{
//             username:username
//         }
//     }).then((user)=>{
//         if(!user)
//         {
//             return done(null,false,{message:"No such user "})
//         }
//         if(user.password!=password)
//         {
//             return done(null,false,{message:"Wrong Password"})
//         }
        
//         return  done(null,user)
        
//     }).catch((err)=>{
//         return done(err)
//     })
// }))
passport.use(new localStrategy(
    function(username,password,done){
        Users.findOne({
            where:{username:username} 
        }).then((user)=>{
            if(!user){
                return done(null,false) 
            }
            if(user.password != password){
                return done(null,false) 
            }
            done(null,user) 
        }).catch(done)
    }
))

module.exports=passport
//