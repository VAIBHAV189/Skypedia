const route = require('express').Router()
const db = require('../db')

route.get('/',(req,res)=>{
    if(req.user) {
        let user = req.user.username;
        return res.render('userView',{user})
    }
    else 
        return res.redirect('/root/login')
})

route.post('/booking',(req,res)=>{
    if(req.user) {
        let obj = JSON.parse(req.body.obj)
        obj.user = req.user.username
        return res.render('booking',obj)
    }
    return res.send({error: "User Invalid"})  
})

route.post('/confirm_booking',function(req,res){
    if(req.user) {
        let obj = req.body
        obj.username = req.user.username
        console.log('user.js')
        console.log(obj)
        db.confBookingUser(obj) 
          .then((flights)=>{
              //flights would be of the form Ticket id with username
              console.log(flights)
            //   let details = req.body
            //   details.user = req.user.username
              return res.send('succesfull')
          }) 
          .catch((err)=>{
              return res.send(err)
          })
    }
    else res.redirect('/login')
})

route.post('/search',(req,res)=>{
    if(req.user)
    {   
        db.searchDetailsUser(req.body)
            .then((flights)=>{
                return res.render('userView',{flights})
            })
            .catch((err)=>{
                return res.send({error:"Not Found"})
            })
    }
    else 
        return res.redirect('/root/login')
})

route.post('/history',(req,res)=>{
    if(req.user)
    {
        let obj = {}
        obj.user = req.user.username
        db.searchUserHistory(obj)
            .then((history)=>{
                return res.render('userhistory',{history})
            })
            .catch((err)=>{ 
                return res.send({error:"Not Found"})
            })
    }
    else 
        return res.redirect('/root/login')
})

module.exports = {
    route
}