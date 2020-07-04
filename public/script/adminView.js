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

function search(src,des,sd)
{
    let flag=0
    $("#details tr").each(function(){
        let currentRow=$(this)

        let flight={
            flightId:currentRow.find('td:eq(0)').text(),
            flightName:currentRow.find('td:eq(1)').text(),
            source:currentRow.find('td:eq(2)').text(),
            destination:currentRow.find('td:eq(3)').text(),
            price:currentRow.find('td:eq(4)').text(),
            startDate:currentRow.find('td:eq(5)').text(),
            startTime:currentRow.find('td:eq(6)').text(),
            endDate:currentRow.find('td:eq(7)').text(),
            endTime:currentRow.find('td:eq(8)').text(),
            seatsLeft:currentRow.find('td:eq(9)').text()
        }

        if(flight.source===src&&flight.destination===des&&flight.startDate===sd)
        {
            flag=1
            let tr=document.createElement('tr')
            for(item in flight)
            {
                let td=document.createElement('td')
                td.innerHTML=flight[item]
                tr.append(td)
            }    
            $('#searchTable tbody').append(tr)
        }
    })
    if(flag)
    {
        $('#topRow').show()
    }
    else
    {
        $('#topRow').hide()
        $("#alertSearch").show()
    }
}
function fdbtn(){
    $('#flightDetails').show()
    $('#insertDetails').hide()
    $('#searchDetails').hide()

}
function inbtn(){
    $('#flightDetails').hide()
    $('#insertDetails').show()
    $('#searchDetails').hide()

}
function sbtn(){
    $('#flightDetails').hide()
    $('#insertDetails').hide()
    $('#searchDetails').show()
    $("#alertSearch").hide()


}

$(()=>{
    $('#flightDetails').hide()
    $('#insertDetails').hide()
    $('#searchDetails').hide()

    $('#fdbtn').click(()=>{
       console.log("FDBTN pressed")
       fdbtn()
    })
    
    $('#inbtn').click(()=>{
       inbtn()
    })
    
    $('#sbtn').click(()=>{
        sbtn()
    })

    $('#fdbtn').trigger("click")

    $('#searchSubmit').click(()=>{
        $('#searchTable tbody tr').remove()
        let src=$('#src').val()
        let des=$('#des').val()
        let sd=$('#sd').val()
        search(src,des,sd)

    })
})


