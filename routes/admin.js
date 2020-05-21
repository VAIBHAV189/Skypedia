const route= require('express').Router()
const db=require('../db')


db.createTable()
    .then(()=>{})
    .catch((err)=>{console.log(err)})

route.get('/',(req,res)=>{
    if(req.user&&req.user.username==='admin')
    // if(req.user)
    {
        console.log(req.user)
        db.getAllDetails()
        .then((flights)=>{
            return res.render('adminView',{flights})
        })
        .catch((err)=>{ 
            return res.send(err)
        })
    }
    else
        return res.redirect('/root/login')
})
    


route.get('/search',(req,res)=>{
    if(req.user&&req.user.username==='admin')
    // if(req.user)
    {
        let obj=[]
        return res.render('searchAdmin',{obj})
    }
    else
        return res.redirect('/root/login')
})

route.get('/delete',(req,res)=>{
    if(req.user&&req.user.username==='admin')
    // if(req.user)
    {
        return res.render('deleteAdmin') 
    }
    else
        return res.redirect('/root/login')
})

route.post('/',(req,res)=>{
    if(req.user&&req.user.username==='admin')
    // if(req.user)
    {
        db.insertDetails(req.body)
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

route.post('/search',(req,res)=>
{
    if(req.user&&req.user.username==='admin')
    // if(req.user)
    {
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


route.post('/delete',(req,res)=>{
    if(req.user&&req.user.username==='admin')
    // if(req.user)
    {
        db.deleteDetails(req.body)
            .then((data)=>{
                console.log("Successful delete")
                return res.redirect('/admin')
            })
            .catch((err)=>{
                console.log("Not found")
                return res.send({error:"Some error detected"})
            })
    }
    else
        return res.redirect('/root/login')
})

module.exports={
    route
}