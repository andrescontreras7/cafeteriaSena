import jsonwebtoken from "jsonwebtoken";
import { adminPermissions } from "../utils/manage.permissions.js";
import 'dotenv/config'
import { response } from "../utils/responses.js";
import { getProveedorModels, createProveedorModels, getProvID } from "../models/proveedor.models.js"
import uniqid from 'uniqid';

const jwt = jsonwebtoken

//get all categories
export const getProveedor = async (req, res) => {

    try {

        const proveedor = await getProveedorModels();

        if (proveedor.length > 0) {
            response(res, 200, 200, proveedor);
        } else {
            response(res, 204, 204, proveedor);
        }

    } catch (err) {

        if (err.errno) {

            response(res, 400, err.errno, err.code);

        } else {
            response(res, 500, 500, "something went wrong");
        }
    }
}

export const createProveedor = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 500, 105, "Something went wrong");
        }
        try {
        
            const id_ProvPK = uniqid();

            
            const {nomb_Prov,fech_Reg } = req.body;

            

            if (!nomb_Prov) {
                response(res, 400, 102, "Something went wrong");

            } else {
                console.log(fech_Reg,nomb_Prov)
                //verificamos que no exista una categoria con el mismo nombre
                const proveedorExis = await getProvID(nomb_Prov)

                if (proveedorExis.length > 0) {
                    response(res, 500, 107, "proveedor already exist");
                } else {
                    

                    const userData = jwt.decode(req.token, process.env.SECRETWORD);
                  
                    //verify user permissions
                    const adminPermiso = adminPermissions(userData.user.Id_Rol_FK);
                 
                    if (!adminPermiso) {
                        response(res, 403, 403, "you dont have permissions");
                    } else {
                        //create proveedor
                        const datos = {
                            id_ProvPK: id_ProvPK,
                            nomb_Prov: nomb_Prov,
                            fech_Reg: fech_Reg
                        }

                       

                        const newproveedor = await createProveedorModels(datos);
                        const objResp = {
                            insertID: id_ProvPK
                        }
                        response(res, 200, 200, objResp);
                    }
                }
            }
        } catch (err) {
            if (err.errno) {
                response(res, 400, err.errno, err.code);
            } else {
                response(res, 500, 500, "something went wrong");
            }
        }
    })
}



export const UpdateProveedor = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        if (err) {
            response(res, 400, 105, "something went wrong");
        }
        try {
            const { Id_Rol_FK } = dat.user;
            let adPermision = adminPermissions(Id_Rol_FK);

            if (adPermision) {
                //data

                const { id } = req.params;
                const { nomb_Prov } = req.body;

                //verify exist category
                const proveedor = await getProvID(id)
                if (proveedor.length > 1) {
                    response(res, 500, 103, "Something went wrong");
                } else {
                    const datos = {
                        id: id,
                        nomb_Prov: nomb_Prov
                    }

                    const response = await UpdateProveedor(datos)
                    const objRes = {
                        affectedRows: responses.affectedRows
                    }
                    response(res, 200, 200, objRes);
                }
            } else {
                response(res, 401, 401, "you dont have permissions");
            }

        } catch (err) {
            if (err.errno) {
                response(res, 400, err.errno, err.code);
            } else {
                response(res, 500, 500, "something went wrong");
            }
        }
    })
}



export const deleteProveedor = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, datos) => {
        if (err) {
            response(res, 400, 105, "Something went wrong");
        }
        try {

            const { id } = req.params;
            const { Id_Rol_FK } = datos.user;
            const permiso = adminPermissions(Id_Rol_FK);


            if (!permiso) {
                response(res, 401, 401, "You don't have permissions");

            }
            const proveedor = await getProvID(id)
            if (proveedor.length > 0) {
                const responses = await deleteProveedor(id)

                response(res, 200, 200, responses);
            } else {
                response(res, 200, 204, proveedor);
            }


        } catch (err) {

            if (err.errno) {

                response(res, 400, err.errno, err.code);

            } else {
                response(res, 500, 500, "something went wrong");

            }
        }
    })
}