const route= require('express').Router()
const db=require('../db')

//--------------------------------------------------Create Tables------------------------------------------//
db.createTable()
    .then(()=>{})
    .catch((err)=>{console.log(err)})

//-------------------------------------------------Admin Front Page---------------------------------------//
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

//-----------------------------------------------------Update Schedule--------------------------------------------//
route.post('/schedule',(req,res)=>{
    if(req.user&&req.user.username==='admin')
    {
        db.insertDetailsadmin(req.body)
            .then(()=>{
                console.log("Updating Seats Now")
                db.updateSeats(req.body)
                .then(()=>{  
                    console.log("Wapis aa gaya update karke")
                    return res.redirect('/admin/') 
                })
            })
            
            .catch((err)=>{
                return res.send(err)
            })
    }
    else
        return res.redirect('/root/login')
    
})

//----------------------------------------------Update Flight Details-------------------------------------------//
route.post('/insertFlight',(req,res)=>{
    if(req.user&&req.user.username==='admin')
    {
        db.insertInFlightDetails(req.body)
            .then(()=>{return res.redirect('/admin') })
            .catch((err)=>{return res.send(err)})
    }
    else
        return res.redirect('/root/login')
    
})

//------------------------------------------------------Error Page---------------------------------------------//
route.get("/*",(req,res)=>{
    res.render('errorPage')
})


module.exports={
    route
}