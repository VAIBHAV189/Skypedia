$(()=>{
    let seat = $('#seats').val()
    let insert = ''
    for(let i=1;i<=seat;i++) {
        insert += ` <h3>Passenger `+i+`</h3>
        <label for="pass_name`+i+`">Passenger Name</label> <input type="text" id="pass_name`+i+`" name="name`+i+`" required> &nbsp; &nbsp;
        <label for="pass_gender`+i+`" >Gender</label> <input type="text" id="pass_gender`+i+`" name="gender`+i+`" required> &nbsp; &nbsp;
        <label for="pass_age`+i+`">Age</label> <input type="number" id="pass_age`+i+`" name="age`+i+`" required> &nbsp; &nbsp; <br> <br> `
    }
       insert += `<input type="submit" value="Pay and Book Ticket"> <br><br>`
    $('#all_details').append(insert)
}) 