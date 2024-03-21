import { connection } from "../database/db.js";
import { Sequelize, DataTypes } from "sequelize";
import Usuario from "./users.model.js";


const Role = connection.define('Role', {
   
    Id_Rol: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      allowNull: false,
      primaryKey:true,

    },
    Nom_Rol: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  
  Role.hasMany(Usuario, {foreignKey:'Id_Rol_FK'})
  Usuario.belongsTo(Role, {foreignKey:'Id_Rol_FK', targetKey:'Id_Rol'})

  export default Role;
