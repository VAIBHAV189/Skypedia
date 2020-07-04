(function ($) {
    function floatLabel(inputType) {
      $(inputType).each(function () {
        var $this = $(this);
        // on focus add cladd active to label
        $this.focus(function () {
          $this.next().addClass("active");
        });
        //on blur check field and remove class if needed
        $this.blur(function () {
          if ($this.val() === "" || $this.val() === "blank") {
            $this.next().removeClass();
          }
        });
      });
    }
    // just add a class of "floatLabel to the input field!"
    floatLabel(".floatLabel");
})(jQuery);


$(()=>{
    let seat = $('#seats').val()
    let insert = ''
    for(let i=1;i<=seat;i++) {
        insert += ` <h3>Passenger `+i+`</h3>
        <input type="text" id="pass_name`+i+`" name="name`+i+`"  class = "floatingLabel" required> <label for="pass_name`+i+`">Passenger Name</label> &nbsp; &nbsp;
        <input type="text" id="pass_gender`+i+`" name="gender`+i+`"  class = "floatingLabel" required> <label for="pass_gender`+i+`" >Gender</label> &nbsp; &nbsp;
        <input type="number" id="pass_age`+i+`" name="age`+i+`"  class = "floatingLabel" required> <label for="pass_age`+i+`">Age</label> &nbsp; &nbsp; <br> <br> `
    }
       insert += `<input type="submit" value="Pay and Book Ticket"> <br><br>`
    $('#all_details').append(insert)
}) 