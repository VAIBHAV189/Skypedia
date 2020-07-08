const route= require('express').Router()
const db=require('../db')

db.createTable()
    .then(()=>{})
    .catch((err)=>{console.log(err)})

route.get('/',(req,res)=>{
    if(req.user&&req.user.username==='admin') {
        db.getAllSchedules()
        .then((flights)=>{
            let ans = {}
            db.getAllflightDetails()
                .then((details)=>{
                    ans = {
                        flights,
                        details,
                    }
                    // console.log('ans') 
                    return res.render('adminView',ans)
                })
                .catch((err)=>{ 
                    return res.send(err)
                })
            // console.log(ans)
        })
        .catch((err)=>{ 
            return res.send(err)
        })
    }
    else
        return res.redirect('/root/login')
})


route.post('/',(req,res)=>{
    if(req.user&&req.user.username==='admin')
    {
        db.insertDetailsadmin(req.body)
        .then(()=>{
            return res.redirect('/admin')
        }) 
        .catch((err)=>{
            return res.send(err)
        })
    }
    else
        return res.redirect('/root/login')
    
})

route.get("/*",(req,res)=>{
    res.render('errorPage')
})

module.exports={
    route
}