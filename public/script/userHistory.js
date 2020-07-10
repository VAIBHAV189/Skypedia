$(()=>{
    setTimeout(()=>{
        $(".wrapper").hide()
    },2200) 
    //-----------------------------------------------------------------------Login checker------------------------------------------------------------//
    function loginCheck()
    {
        return new Promise((resolve,reject)=>{
            $.get('/root/username',(details)=>{
                resolve(details);
            })   
        })
    }
    loginCheck().then((obj)=>{
        $('#logout').hide() 
        $("#topRow").hide()
        if(obj.login==="true")
        {
            $('#login').hide()
            $('#signup').hide()
            $('#user').html("Welcome " + obj.username)
            $('#logout').show();
        }
    })
})