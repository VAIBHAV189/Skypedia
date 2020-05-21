const sequelize=require('sequelize')
 
const db=new sequelize({
    dialect:'sqlite',
    storage:__dirname+'/users.db'
})

const Users=db.define('user',{
    username:{
        type:sequelize.STRING(30),
        unique:true,
        allowNull:false
    },
    password:{
        type:sequelize.STRING(20)
    },  
    firstName:{
        type:sequelize.STRING(30)
    },
    lastName:{
        type:sequelize.STRING(30)
    }
})
db.sync().then(()=>{
    console.log("Data Base is ready")
})
module.exports={
    db,Users
}