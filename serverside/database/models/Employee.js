const sequelize=require('sequelize')
const seq=require("../config")
const Person = require("./Person")

const Employee=seq.define("employee",{

    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    designation:{
        type:sequelize.STRING,
        allowNull:false,
    },
    salary:{type:sequelize.DOUBLE,
        allowNull:false,
    },
    officeContact:{type:sequelize.STRING,
        allowNull:false,
    },
    personId:{type:sequelize.INTEGER,
        allowNull:false,
    },
   
});

Employee.belongsTo(Person,{foreignKey:'personId'})
//here Person (pk id col) is primary model/table and Employee (personId) is a secondary model/table


module.exports =Employee