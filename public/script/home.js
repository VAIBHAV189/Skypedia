
function loginCheck()
{
    return new Promise((resolve,reject)=>{
        $.get('/root/username',(details)=>{
            // console.log("Deatils Received " + details.login);
            resolve(details);
        })   
    })
}

$(()=>{
    
    setTimeout(()=>{
        $(".wrapper").hide()
    },5500)  
    
    loginCheck().then((obj)=>{
        $('#logout').hide() 
        // $('#user').hide()   
        // console.log("Object Received : " + obj.login);
        if(obj.login==="true")
        {
            console.log("Here");
            $('#login').hide()
            $('#signup').hide()
            $('#user').html("Welcome " + obj.username)
            // $('#user').show()
            $('#logout').show();
        }
    })
})





    
