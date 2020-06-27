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



route.post('/search',(req,res)=>{
    if(req.user)
    {   
        // console.log(req.body)
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
        db.searchUserHistory(req.body)
            .then((history)=>{
                return res.render('userView',{history})
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