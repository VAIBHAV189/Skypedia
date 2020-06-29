$.post('/root/username',(data)=>{
    // Problem ye hai ki data mei error aane ke baad bh wo if statement satisfy kar rhaa ;P
    if(data)
    {
        $('#login').hide()
        $('#signup').hide()
        $('#user').html("Welcome "+data)
        $('#logout').prop('disabled','false')
        return
    }
    $('#logout').hide() 
    $('#user').hide()
})

