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
                    console.log('ans') 
                    return res.render('adminView',ans)
                })
                .catch((err)=>{ 
                    return res.send(err)
                })
            console.log(ans)
        })
        .catch((err)=>{ 
            return res.send(err)
        })
    }
    else
        return res.redirect('/root/login')
})

route.get('/search',(req,res)=>{
    if(req.user && req.user.username === 'admin') {
        let obj = []
        return res.render('searchAdmin',{obj})
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

route.post('/search',(req,res)=> {
    if(req.user && req.user.username === 'admin') {
        db.searchDetails(req.body)
        .then((flights)=>{
            console.log(flights)
            return res.render('searchAdmin',{flights})
        })
        .catch((err)=>{
            console.log("Not found")
            return res.send({error:"Not Found"})
        })
    }
    else 
        return res.redirect('/root/login')
    
})

module.exports={
    route
}