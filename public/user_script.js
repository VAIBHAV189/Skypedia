$(()=>{
    $('.book').click(function(){
       let arr = $(this).children()
       let f_name = arr[0].innerHTML
       let source = arr[1].innerHTML
       let destination = arr[2].innerHTML
       let Price = arr[3].innerHTML
       let startDate = arr[4].innerHTML
       let startTime = arr[5].innerHTML
       let endDate = arr[6].innerHTML
       let endTime = arr[7].innerHTML
       let seatsLeft = arr[8].innerHTML

       $('#f_description').html(
           `You have chosen Flight:`+f_name +` <br> 
           This flight will take off from `+ source+` on `+ startDate+`, ` +startTime+` IST <br> 
           and will Land on `+destination +` at `+ endDate+`, `+ endTime+` IST 
           <br> Price per seat: `+ Price +`
           <br> Total seats left: `+ seatsLeft+`
           <br> Enter total Seats that you want &nbsp &nbsp <input type="Number" id="seats">&nbsp &nbsp <button id="Booking_redirect">Start Booking</button><br> <br> `
       )
       $('#Booking_redirect').click(function(){
           let num = $('#seats')
           if(Number(num.val())>seatsLeft) {
               num.val('')
               alert('Cant book these many tickets') 
               return
           }
          
           let obj = {
               f_name: f_name,
               source: source,
               startDate: startDate,
               startTime: startTime,
               destination: destination,
               endDate: endDate,
               endTime: endTime,
               Price: Price,
               seats: Number(num.val())
           }
           $.post('/user/booking',{obj})
           return    
       })
    })
})



//    let seats = num.val()
        //    let add_here = ''
        //    for(let i=1;i<=seats;i++) {
        //        add_here = add_here + `<label for=name"`+i+`">Passenger Name</label> <input type="text" id=name"`+i+`"> &nbsp&nbsp&nbsp&nbsp
        //        <label for=age"`+i+`">Passenger Age</label> <input type="Number" id=age"`+i+`"> &nbsp&nbsp&nbsp&nbsp
        //        <label for=gender"`+i+`">Gender</label> <input type="text" id=gender"`+i+`"> <br>
        //        <hr>`
        //    }
        //    add_here += '<br>'
        //    $('#booking_input').html(add_here) 