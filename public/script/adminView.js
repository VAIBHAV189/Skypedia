
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

//-----------------------------------------------------------------------Admin search-------------------------------------------------------------//
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

//-----------------------------------------------------------------Admin Nav buttons-------------------------------------------------//
function fdbtn(){
    $('#flightDetails').show()
    $('#scheduleFlight').hide()
    $('#searchDetails').hide()
    $('#insertFlight').hide()

}
function inbtn(){
    $('#flightDetails').hide()
    $('#scheduleFlight').hide()
    $('#searchDetails').hide()
    $('#insertFlight').show()

}
function sbtn(){
    $('#flightDetails').hide()
    $('#scheduleFlight').hide()
    $('#searchDetails').show()
    $("#alertSearch").hide()
    $("#insertFlight").hide()
}

function schbtn()
{
    $('#flightDetails').hide()
    $('#scheduleFlight').show()
    $('#searchDetails').hide()
    $('#insertFlight').hide()
}

//-----------------------------------------------------------Document Ready-----------------------------------------------//
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
    
    $('#schbtn').click(()=>{
        schbtn()
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


