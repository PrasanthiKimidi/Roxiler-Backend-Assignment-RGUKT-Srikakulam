const sequelize = require('../helpers/connection')
const Datatypes = require('sequelize')
const Products = sequelize.define('products',{
    id:{
        type:Datatypes.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:Datatypes.STRING,
        allowNull:false
    },
    price:{
        type:Datatypes.DECIMAL(10,2),
        allowNull:false
    },
    description:{
        type:Datatypes.TEXT,
        allowNull:false
    },
    category:{
        type:Datatypes.STRING,
        allowNull:false
    },
    image:{
        type:Datatypes.STRING,
        allowNull:false
    },
    sold:{
        type:Datatypes.BOOLEAN,
        allowNull:false
    },
    dateOfSale:{
        type:Datatypes.DATE,
        default:sequelize.NOW
    }
},
    {
        freezeTableName:true
    });

    // Products.sync({alter:true}).then(()=>{
    //     console.log("successfully synced");
    // }).catch((error)=>{
    //     console.log("error in syncing the table",error)
    // })

    module.exports = Products