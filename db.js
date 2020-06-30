const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'myuser',
    password: 'mypaaas',
    database:'airline_manager' 
})
//correct
function createTable()
{
    return new Promise((resolve,reject)=>{
        connection.query(
            `CREATE TABLE IF NOT EXISTS schedule (
                flightId int, 
                flightName varchar(30), 
                source varchar(30), 
                destination varchar(30), 
                price integer, 
                startDate varchar(30), 
                startTime time, 
                endDate varchar(30), 
                endTime time,
                seats_left integer,
                primary key(flightId , startTime)
            );`,
            function(err,result){
                console.log("Table1 Created")
                if(err)
                    reject(err)
                else
                    resolve(result)
            }
        )
        connection.query(
            ` CREATE TABLE IF NOT EXISTS flight_details (
                flight_id INTEGER PRIMARY KEY,
                flight_name varchar(30) NOT NULL,
                capacity INTEGER NOT NULL
            );`,
            function(err,result){
                console.log("Table2 Created")
                if(err)
                    reject(err)
                else
                    resolve(result)
            }
        )
        connection.query(
            `CREATE TABLE IF NOT EXISTS transaction_info (
                payment_id varchar(30) PRIMARY KEY,
                user_id varchar(30) NOT NULL,
                amount INTEGER NOT NULL
            );`,
            function(err,result){
                console.log("Table3 Created")
                if(err)
                    reject(err)
                else
                    resolve(result)
            }
        )
        connection.query(
            `CREATE TABLE IF NOT EXISTS bookings (
                T_id integer PRIMARY KEY auto_increment,
                username varchar(30),
                flight_id integer, 
                startDate varchar(30),
                pass_name varchar(50),
                pass_age integer,
                pass_gender varchar(1),
                pass_seat_num integer,
                payment_id varchar(30)
            );`,
            function(err,result){
                console.log("Table4 Created")
                if(err)
                    reject(err)
                else
                    resolve(result)
            }
        )
    })
}
//correct
function getAllSchedules()
{
    return new Promise((resolve,reject)=>{
        connection.query(
            `SELECT * FROM schedule`,
            function(err,rows,col)
            {
                if(err)
                    reject(err)
                else 
                    resolve(rows)
            }
        )
    })
}
//correct
function getAllflightDetails()
{
    return new Promise((resolve,reject)=>{
        connection.query(
            `SELECT * FROM flight_details`,
            function(err,rows,col)
            {
                if(err)
                    reject(err)
                else 
                    resolve(rows)
            }
        )
    })
}
//correct
function insertDetailsadmin(obj)
{
    // console.log(obj)
    return new Promise((resolve,reject)=>{
        connection.query(
            `INSERT INTO schedule(flightId, flightName, source, destination, price, startDate, startTime, endDate, endTime) 
            VALUES(?,?,?,?,?,?,?,?,?)`,
            [obj.flightId,obj.flightName,obj.source,obj.destination,obj.price,obj.startDate,obj.startTime,obj.endDate,obj.endTime],
            function(err,result)
            {
                if(err)
                    reject(err)
                else 
                    resolve(result)
            }
        )
        connection.query(
           `UPDATE schedule 
            SET seats_left = (
               SELECT capacity
               FROM flight_details
               WHERE flight_id = ?
            )
            WHERE flightId = ?;
            `,
            [obj.flightId , obj.flightId],
            function(err,result) {
                console.log(err);
                if(err)
                    reject(err)
                else 
                    resolve(result)
            }
        )
    })
}

function insertinschedule(obj) {
    
}

function searchDetails(obj)
{
    return new Promise((resolve,reject)=>{
        connection.query(
            `SELECT *FROM FLIGHT_MANAGEMENT
            WHERE source=? AND destination=? AND startDate=?`,
            [obj.source,obj.destination,obj.startDate],
            function(err,result)
            {
                // console.log(result)
                if(err)
                    reject(err)
                else
                    resolve(result)
            }
        )
    })
}
//correct
function searchDetailsUser(obj)
{
    return new Promise((resolve,reject)=>{
        connection.query(
            `SELECT flightName, source, destination, startDate, startTime, endDate, endTime, price, seats_left  
            FROM schedule
            WHERE source=? AND destination=? AND startDate=?
            ORDER BY PRICE ASC`,
            [obj.source,obj.destination,obj.startDate],          
            function(err,result) {
                if(err) {
                    reject(err)
                }
                else {
                    resolve(result)
                }
            }
        )
    })
}
function searchUserHistory(obj)
{
    return new Promise((resolve,reject)=>{
        connection.query(
            `SELECT bookings.T_id, bookings.username, bookings.startDate, bookings.pass_name, bookings.pass_age, bookings.pass_gender, bookings.pass_seat_num, flight_details.flight_name, schedule.source, schedule.destination, schedule.price, schedule.startTime, schedule.endDate, schedule.endTime
            FROM bookings 
            JOIN flight_details ON bookings.flight_id = flight_details.flight_id
            JOIN schedule ON bookings.flight_id = schedule.flightId AND bookings.startDate = schedule.startDate
            WHERE bookings.username = ?
            ORDER BY bookings.startDate DESC;
            `,
            [obj.user],          
            function(err,result) {
                if(err) {
                    reject(err)
                }
                else {
                    let obj = Object.assign({}, result)
                    resolve(obj)
                }
            }
        )
    })
}
//correct
function deleteflightDetails(obj)
{
    return new Promise((resolve,reject)=>{
        connection.query(
            `DELETE FROM flight_details
            WHERE flight_id=?`,
            [obj.flightId],
            function(err,result) {
                // console.log(result)
                if(err) reject(err)
                else {
                    connection.query(
                        `SELECT * FROM flight_details`,
                        function(err,result) {
                            if(err)
                                reject(err)
                            else
                                resolve(result)
                        }
                    )
                }
            }
        )
    })
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQ9876543210RSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function confBookingUser(obj) {
    return new Promise((resolve,reject)=>{
        let seats = obj.seats
        console.log(obj)
        //generate payment_id
        let payment_id = makeid(10)
        //find flight_id 
        let flight_id
        connection.query(
            `SELECT flightId FROM schedule 
            WHERE flightName = ? AND startDate = ?`,
            [obj.f_name,obj.startDate],
            function(err,result) {
                if(err) {
                    console.log('flight_id') 
                    reject(err)
                }
                else {
                    console.log("one"+result[0].flightId)
                    flight_id = result[0].flightId
                    for(let i=1;i<=seats;i++) {
                    //     //retrieve last seat number
                    //     // console.log(i)
                    //     let seat_num = 0
                    //     connection.query(
                    //         `SELECT seats_left FROM schedule 
                    //         WHERE flightName = ? AND startDate = ?`,
                    //         [obj.f_name,obj.startDate],
                    //         function(err,result) {
                    //             if(err) {
                    //                 console.log('retrieve seat num') 
                    //                 reject(err)
                    //             }
                    //             else {
                    //                 seat_num = result[0].seats_left
                    //                 console.log("two"+seat_num)
                    //                 seat_num--
                    //                 console.log("three"+seat_num)
                    //                 //decrement seats left by one
                    //                 connection.query(
                    //                     `UPDATE schedule 
                    //                     SET seats_left = ? WHERE flightName = ? AND startDate = ?`,
                    //                     [seat_num,obj.f_name,obj.startDate],
                    //                     function(err,result) {
                    //                         // console.log('dgdgd')
                    //                         // console.log(result)
                    //                         // console.log(err)
                    //                         if(err) {
                    //                             console.log('decrement seats left') 
                    //                             reject(err)
                    //                         }
                    //                     }
                    //                 )
                    //                 console.log('decrement done')
                    //                 //now insert all details in booking table for ith passenger
                    //                 let pass_name = obj["name"+i]
                    //                 let pass_age = obj["age"+i]
                    //                 let gender = obj["gender"+i]
                    //                 console.log({pass_name,pass_age,gender})
                    //                 connection.query(
                    //                     `INSERT INTO bookings (username,flight_id,startDate,pass_name,pass_age,pass_gender,pass_seat_num,payment_id) 
                    //                     VALUES ( ? , ? ,? , ? , ? , ? , ? , ? ) `,
                    //                     [obj.username,flight_id,obj.startDate,pass_name,pass_age,gender,seat_num,payment_id],
                    //                     function(err,result) {
                    //                         if(err) {
                    //                             console.log('main query') 
                    //                             reject(err)
                    //                         }
                    //                         else {
                    //                             console.log('main query done')
                                                
                    //                         }
                    //                     }
                    //                 )
                    //             }
                    //         }
                    //     )  
                    }
                    //total payment that he made and update transaction info
                    let payment = seats*obj.price
                    connection.query(
                        `INSERT INTO transaction_info(payment_id,user_id,amount) VALUES(?,?,?)`,
                        [payment_id,obj.username,payment],
                        function(err,result){
                            if(err) {
                                reject(err)
                            }
                            else {
                                //extract and send all T_id with payment_id
                                connection.query(
                                    `SELECT T_id, username FROM bookings WHERE payment_id = ?`,
                                    [payment_id],
                                    function(err,result){
                                        if(err) {
                                            reject(err)
                                        }
                                        else {
                                            console.log(result)
                                            resolve(result)
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            }
        )
    })
}

module.exports={
    createTable,
    getAllSchedules,
    getAllflightDetails,
    insertDetailsadmin,
    searchDetails,
    deleteflightDetails,
    searchDetailsUser,
    searchUserHistory,
    confBookingUser
}