import { connection } from "../database/db.js";
import { Sequelize, DataTypes } from "sequelize";


const Producto = connection.define('Producto', {
   
    PROD_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true,

    },
    PROD_COD: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PROD_NOM: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PROD_DESC: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    PROD_PREC:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:null,
    },
    CAT_ID_FK:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
    // Other model options go here
  });

  export default Producto;