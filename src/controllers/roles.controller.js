import Role from '../models/roles.model.js';
import { adminPermissions } from '../utils/manage.permissions.js';
import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config'
import { response } from '../utils/responses.js';
const jwt = jsonwebtoken;



//get all roles
export const GetRoles = async (req, res) => {

    try {

        jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

            const { Id_Rol_FK } = data.user;

            const adminPermiso = adminPermissions(Id_Rol_FK);

            if (adminPermiso) {
                const roles = await Role.findAll();

                if (roles) {
                    response(res, 200, 200, roles);
                } else {
                    response(res, 404, 404,'Not Found');
                }
            } else {
                response(res, 401, 401, "You don't have permissions");
            }

        });

    } catch (error) {

            response(res, 500, 500, "something went wrong");

    }

}

//get  roles by id
export const GetRolesxId = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        try {
            const { id } = req.params;

                const roles = await Role.findByPk(id);

                if (roles) {
                    response(res, 200, 200, roles);
                } else {
                    response(res, 404, 404, roles);
                }

        } catch (err) {

                response(res, 500, 500, "something went wrong");
        }
    })

}

// create roles
export const createRoles = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 500, 105, "Something went wrong");
        }

        try {

            const { Id_Rol_FK } = data.user;

            //verify user permissions
            const adminPermiso = adminPermissions(Id_Rol_FK);

            if (!adminPermiso) {

                response(res, 403, 403, "you dont have permissions");
            } else {

                const { Nom_Rol } = req.body;

                    //verificamos que no exista un rol con el mismo nombre
                    const rolExists = await Role.findOne({where:{Nom_Rol: Nom_Rol}})


                    if (rolExists) {

                        response(res, 500, 107, "rol already exist");

                    } else {

                        //create a rol
                        const datos = {
                            Nom_Rol: Nom_Rol.toLowerCase()
                        }

                        const newRol = await Role.create(datos);

                        if(newRol){
                            response(res,200)
                        }else{
                            response(res,500,500, "Error creating")
                        }


                    }

            }

        } catch (err) {
                response(res, 500, 500, "something went wrong");
        }


    })
}
// //update roles
export const UpdateRoles = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {

            response(res, 400, 105, "Something went wrong");
        }

        try {
            const { Id_Rol_FK } = dat.user;

            let adPermision = adminPermissions(Id_Rol_FK);

            if (adPermision) {

                //Data
                const { id } = req.params;
                const datos = req.body;

                //verify exist ROL
                let datosEnv;
                let roles = await Role.findByPk(id)

                if (!roles) {
                    response(res, 500, 103, "Rol don't exist");

                } else {
                    roles = roles.dataValues;

                    datosEnv = {
                      
                        Nom_Rol: datos.Nom_Rol || roles.Nom_Rol
                    }

    
                    const responses = await Role.update(datosEnv,{where:{ Id_Rol : id}})
                    if(responses){
                        response(res,200)
                    }else{
                        response(res,500,500, "Error updating")
                    }
                }

            } else {
                response(res, 401, 401, "You don't have permissions");
            }

        } catch (err) {

                response(res, 500, 500, "something went wrong");

        }



    })
}