const route= require('express').Router()
const db=require('../db')

route.get('/',(req,res)=>{
    if(req.user)
    {
        let obj=[];
        return res.render('userView',{obj})
    }
    else 
        return res.redirect('/root/login')
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

module.exports={
    route
}