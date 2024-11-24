const sequelize=require('sequelize')
const seq=require("../config")

const Person=seq.define("person",{

    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    name:{
        type:sequelize.STRING,
        allowNull:false,
    },
    age:{type:sequelize.INTEGER,
        allowNull:false,
    },
    mobile:{type:sequelize.STRING,
        allowNull:false,
    },
    email:{type:sequelize.STRING,
        allowNull:false,
    },
    password:{type:sequelize.STRING,
        allowNull:false,
    }
}
  
    
);

module.exports =Person