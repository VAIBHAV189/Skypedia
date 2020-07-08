const route = require('express').Router()
const db = require('../db');
const passport = require('passport');


function getDate() {
    //Convert UTC to IST
    var dateUTC = new Date()
    var dateUTC = dateUTC.getTime() 
    var d = new Date()
    d.setHours(d.getHours() + 5)
    d.setMinutes(d.getMinutes() + 30)

    return d
}


route.get('/',(req,res)=>{
    if(req.user) {
        user = req.user.username;
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
    return res.redirect('/root/login')  
})

route.post('/confirm_booking',function(req,res){
    if(req.user) 
    {
        console.log('refresh')
        // console.log(req.body)
        // if(req.body.result != undefined) return res.render('reciept',req.body)

        let obj = req.body
        obj.username = req.user.username
        db.confBookingUser(obj) 
          .then((flights)=>{
              //flights contain all information about transaction
              flights.date = getDate().toDateString()
              return res.render('reciept',flights)
          }) 
          .catch((err)=>{
              return res.send(err)
          })
    }
    else res.redirect('/root/login')
})

route.post('/search',(req,res)=>{
    if(req.user)
    {   
        db.searchDetailsUser(req.body)
            .then((flights)=>{
                let user = req.user.username
                if(flights[0] == undefined) 
                {    let empty  = {}
                    return res.render('userView',{user,empty})
                }
                return res.render('userView',{user,flights})
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
            .then((History)=>{
                if(Object.keys(History).length === 0) return res.render('userhistory',{obj}) 
                else { 
                    let future = {}; let f_ind = 0
                    let past = {}; let p_ind = 0
                    for(let temp in History) 
                    {
                        let d = JSON.stringify(getDate()).substr(1,10)
                        if(History[temp].startDate > d) {
                            future[f_ind.toString()] = History[temp]
                            f_ind++
                        }
                        else {
                            past[p_ind.toString()] = History[temp]
                            p_ind++
                        }
                    }
                    let history = {}
                    if(Object.keys(past).length === 0) history['future'] = future
                    else if(Object.keys(future).length === 0) history['past'] = past
                    console.log(history.past)
                    return res.render('userhistory',{obj,history})
                }
            })
            .catch((err)=>{ 
                console.log(err)
                return res.send({error:"Not Found"})
            })
    }
    else 
        return res.redirect('/root/login')
})

route.get("/*",(req,res)=>{
    res.render('errorPage')
})

module.exports = {
    route
}