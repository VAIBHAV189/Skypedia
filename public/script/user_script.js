$(()=>{
    function floatLabel(inputType) {
      $(inputType).each(function () {
        var $this = $(this)
        // on focus add class active to label
        $this.focus(function () {
          $this.next().addClass("active")
        });
        //on blur check field and remove class if needed
        $this.blur(function () {
          if (($this.val() === "" || ($this.val() === "blank")) && !($this.attr("id") == "date")) {
            $this.next().removeClass()
          }
        });
      });
    }
    // just add a class of "floatLabel to the input field!"
    floatLabel(".floatLabel");



    $('#hide').hide()
    $('.bookFlight').click(function(){
       let arr = $(this).parent().siblings()
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
           `<img src="../images/smallimage.PNG" align="right" height="140">
           <span class="info_label">You have chosen Flight: <span class="info">`+f_name +`</span> <br> 
           This flight will take off from <span class="info"> `+ source+` on `+ startDate+`, ` +startTime+` IST </span> <br> 
           and will Land on <span class="info">`+destination +` at `+ endDate+`, `+ endTime+` IST </span> 
           <br> Price per seat: <span class="info">`+ Price +`</span>
           <br> Total seats left: <span class="info">`+ seatsLeft+`</span>
           <br> Enter total Seats that you want &nbsp &nbsp</span> <input type="Number" id="seats"  size="50" >&nbsp &nbsp <button id="Booking_redirect">Start Booking</button> <br><br>`
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
           let val = JSON.stringify(obj)
           $('#obj').val(val);
           $('#click').click();
       })
    })
})