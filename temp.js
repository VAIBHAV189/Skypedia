function getDate() {
    //Convert UTC to IST
    var dateUTC = new Date()
    var dateUTC = dateUTC.getTime() 
    var d = new Date()
    d.setHours(d.getHours() + 5)
    d.setMinutes(d.getMinutes() + 30)

    return d
}