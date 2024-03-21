import { connection } from "../database/db.js";
import { Sequelize, DataTypes } from "sequelize";

const Token = connection.define('Token', {
   
    Id_Token: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      allowNull: false,
      primaryKey:true,

    },
    Token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fec_Caducidad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    User_Id_FK:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Tipo_token:{
        type: DataTypes.CHAR,
        allowNull: false,
        defaultValue:'1'
    }
  });
  

  export default Token;


