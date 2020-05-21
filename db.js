const mysql=require('mysql2')
const connection=mysql.createConnection({
    host: 'localhost',
    user: 'vagish',
    password: 'password',
    database:'check1_db' 
})

function createTable()
{
    return new Promise((resolve,reject)=>{
        connection.query(
            `CREATE TABLE IF NOT EXISTS FLIGHT_MANAGEMENT(
                flightId INTEGER PRIMARY KEY,
                flightName VARCHAR(30) NOT NULL,
                source VARCHAR(30) NOT NULL,
                destination VARCHAR(30) NOT NULL,
                price INTEGER NOT NULL,
                seats INTEGER NOT NULL,
                startDate VARCHAR(30) NOT NULL,
                startTime TIME NOT NULL,
                endDate VARCHAR(30) NOT NULL,
                endTime TIME NOT NULL
            )`,
            function(err,result){
                console.log("Table Created")
                if(err)
                    reject(err)
                else
                    resolve(result)
            }
        )
    })
}

function getAllDetails()
{
    return new Promise((resolve,reject)=>{
        connection.query(
            'SELECT *FROM FLIGHT_MANAGEMENT',
            function(err,rows,col)
            {
                // console.log(rows)
                if(err)
                    reject(err)
                else 
                    resolve(rows)
            }
        )
    })
}

function insertDetails(obj)
{
    console.log(obj)
    return new Promise((resolve,reject)=>{
        connection.query(
            `INSERT INTO FLIGHT_MANAGEMENT VALUES(?,?,?,?,?,?,?,?,?,?)`,
            [obj.flightId,obj.flightName,obj.source,obj.destination,obj.price,obj.seats,
                    obj.startDate,obj.startTime,obj.endDate,obj.endTime],
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

function searchDetailsUser(obj)
{
    console.log('db.js me')
    console.log(obj)
    return new Promise((resolve,reject)=>{
        connection.query(
            `SELECT flightName, source, destination, price, startDate, startTime, endDate, endTime  
            FROM FLIGHT_MANAGEMENT
            WHERE source=? AND destination=? AND startDate=?
            ORDER BY PRICE ASC`,
            [obj.source,obj.destination,obj.startDate],          //ORDER BY PRICE ASC ME PANGE AA RAHE HAIN ye theek kar
            function(err,result)
            {
                if(err) {
                    reject(err)
                }
                else {
                    // console.log(result)
                    resolve(result)
                }
            }
        )
    })
}

function deleteDetails(obj)
{
    return new Promise((resolve,reject)=>{
        connection.query(
            `DELETE FROM FLIGHT_MANAGEMENT
            WHERE flightId=?`,
            [obj.flightId],
            function(err,result) {
                // console.log(result)
                if(err) reject(err)
                else {
                    connection.query(
                        `SELECT * FROM FLIGHT_MANAGEMENT`,
                        function(err,result)
                        {
                            // console.log(result)
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
    getAllDetails,
    insertDetails,
    searchDetails,
    deleteDetails,
    searchDetailsUser
}
