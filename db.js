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
    // console.log('db.js me')
    // console.log(obj)
    return new Promise((resolve,reject)=>{
        connection.query(
            `SELECT bookings.T_id, bookings.username, bookings.startDate, bookings.pass_name, bookings.pass_age, bookings.pass_gender, bookings.pass_seat_num, flight_details.flight_name, schedule.source, schedule.destination, schedule.price
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
                    resolve(result)
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

module.exports={
    createTable,
    getAllSchedules,
    getAllflightDetails,
    insertDetailsadmin,
    searchDetails,
    deleteflightDetails,
    searchDetailsUser,
    searchUserHistory
}
