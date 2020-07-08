$(()=>{
  let seat = $('#seats').val()
  let insert = ''
  for(let i=1;i<=seat;i++) {
      insert += ` 
      <div class="col-2-3">
      <h2>Passenger `+i+`</h2>
        <div class="controls">
          <input type="text" name="name`+i+`" id="pass_name`+i+`" class = "floatLabel"  required> 
          <label for="pass_name`+i+`">Name</label>  &nbsp; &nbsp;
        </div>          
      </div>
      <div class="col-1-3">
        <div class="controls">
          <select name="gender`+i+`" id="pass_gender`+i+`" required>
            <option value="">Choose</option> 
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Others</option>
          </select>
          <label for="pass_gender`+i+`" class="active">Gender</label>  &nbsp; &nbsp;
        </div>          
      </div>
      <div class="col-1-3">
        <div class="controls">  
        <input type="number" name="age`+i+`" id="pass_age`+i+`" class = "floatLabel" required> 
        <label for="pass_age`+i+`">Age</label>  &nbsp; &nbsp;
        </div>          
      </div>`
  }
  console.log(insert)
  // insert += `<input type="submit" value="Pay and Book Ticket"> <br><br>`
  $('#add_here').append(insert)


  function floatLabel(inputType) {
    $(inputType).each(function () {
      var $this = $(this);
      $this.focus(function () {
        $this.next().addClass("active");
      });
      $this.blur(function () {
        if ($this.val() === "" || $this.val() === "blank") {
          $this.next().removeClass();
        }
      });
    });
  }
  floatLabel(".floatLabel");

}) 