import { connection } from "../database/db.js";
import { Sequelize, DataTypes } from "sequelize";
import  Token  from "./tokens.model.js";
import Localizacion from "./localizacion.model.js";


const Usuario = connection.define('Usuario', {
   
    Id_User: {
      type: DataTypes.UUIDV4,
      defaultValue:DataTypes.UUIDV4,
      allowNull: false,
      primaryKey:true,

    },
    Nom_User: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Ape_User: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tel_user:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:null,
    },
    Ema_User:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Pass_User:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Id_Rol_FK:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:3,
        
    },
    Fot_User:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:null,
    },
    Est_Email_User:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    // Other model options go here
  });

  Usuario.hasMany(Token,{foreignKey:'User_Id_FK'})
  Token.belongsTo(Usuario,{foreignKey :'User_Id_FK', targetKey: 'Id_User'});

  Usuario.hasMany(Localizacion,{foreignKey:'Id_User_FK'})
  Localizacion.belongsTo(Usuario,{foreignKey :'Id_User_FK', targetKey: 'Id_User'});

  export default Usuario;