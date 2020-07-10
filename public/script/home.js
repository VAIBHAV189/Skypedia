
function loginCheck()
{
    return new Promise((resolve,reject)=>{
        $.get('/root/username',(details)=>{
            // console.log("Deatils Received " + details.login);
            resolve(details);
        })   
    })
}
let flag="false"
$(()=>{

    if(flag=="false")
    {
        setTimeout(()=>{
            $(".wrapper").hide()
        },3000) 
        flag="true";
    } 
    
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





    
