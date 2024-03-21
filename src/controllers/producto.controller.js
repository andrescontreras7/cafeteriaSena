import jsonwebtoken from "jsonwebtoken"
import { adminPermissions, EmplPermissions } from "../utils/manage.permissions.js";
import 'dotenv/config'
import { response } from "../utils/responses.js";
import Producto from "../models/productos.models.js";
import Categorias from "../models/categorias.model.js";
import uniqid from 'uniqid';

const jwt = jsonwebtoken;
// get all productos from response object
export const GetProductos = async (req, res) => {

    try {

        const data = await Producto.findAll()

        if (data) {
            response(res, 200, 200, data)
        } else {
            response(res, 404)
        }

    } catch (err) {

        response(res, 500, 500, "something went wrong");

    }

}

// get all productos from response object
export const GetProductosId = async (req, res) => {

    try {
        const { id } = req.params;

        const data = await Producto.findByPk(id)

        if (data) {
            response(res, 200, 200, data)
        } else {
            response(res, 404)
        }

    } catch (err) {

        response(res, 500, 500, "something went wrong");

    }

}

export const createProducts = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 500, 105, "Something went wrong");
        } else {
            try {

                const PROD_ID = uniqid();
                const { CAT_ID_FK, PROD_NOM, PROD_DESC, PROD_PREC, PROD_COD } = req.body;
             

                const adminPermiso = adminPermissions(data.user.Id_Rol_FK);
                const emplPermiso = EmplPermissions(data.user.Id_Rol_FK);

                if (!adminPermiso && !emplPermiso) {

                    response(res, 403, 403, "you dont have permissions");
                } else {

                    const productsExis = await Producto.findOne({ where: { PROD_COD: PROD_COD } })
                    const catExist = await Categorias.findByPk(CAT_ID_FK)


                    if (productsExis || !catExist) {

                        response(res, 500, 107, "products or categories already exist");

                    } else {

                        //create category
                        const dataPro = {
                            PROD_ID: PROD_ID,
                            PROD_COD: PROD_COD,
                            PROD_NOM: PROD_NOM,
                            PROD_DESC: PROD_DESC,
                            PROD_PREC: PROD_PREC,
                            CAT_ID_FK: CAT_ID_FK
                        }

                        const nuevoProducts = await Producto.create(dataPro);
                        if (nuevoProducts) {
                            response(res, 200);
                        } else {
                            response(res, 500, 500, "Error creating")
                        }
                    }

                }

            } catch (err) {
                response(res, 500, 500, err);

            }

        }



    })

}

export const updateProductos = async (req, res) => {
    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        if (err) {
            response(res, 500, 105, "Something went wrong");
        } else {
            try {
                const { id } = req.params;
                const datos = req.body;
           

                let dataPro;

                const adminPermiso = adminPermissions(data.user.Id_Rol_FK);

                if (!adminPermiso) {
                    response(res, 403, 403, "you dont have permissions");
                } else {

                    let producto = await Producto.findByPk(id)

                    if (producto) {

                        producto = producto.dataValues;

                        if(datos.CAT_ID_FK){
                            const catExist = await Categorias.findByPk(datos.CAT_ID_FK)
                            if (!catExist) {
                                response(res, 404, 404, "Category not found")
                            }else{

                                dataPro = {
                                    PROD_NOM: datos.PROD_NOM || producto.PROD_NOM,
                                    PROD_DESC: datos.PROD_DESC || producto.PROD_DESC,
                                    PROD_PREC:datos.PROD_PREC || producto.PROD_PREC,
                                    PROD_COD: datos.PROD_COD || producto.PROD_COD,
                                    CAT_ID_FK: datos.CAT_ID_FK || producto.CAT_ID_FK
                                }

                            }

                        }else{

                            dataPro = {
                                PROD_NOM: datos.PROD_NOM || producto.PROD_NOM,
                                PROD_DESC: datos.PROD_DESC || producto.PROD_DESC,
                                PROD_PREC:datos.PROD_PREC || producto.PROD_PREC,
                                PROD_COD: datos.PROD_COD || producto.PROD_COD,
                            }

                        }
                        
                        const updateProductos = await Producto.update(dataPro, { where: { PROD_ID: id } })
                        if (updateProductos) {
                            response(res, 200);
                        } else {
                            response(res, 500, 500, "Error updating")
                        }
                    } else {
                        response(res, 404, 404, "Product not found")
                    }
                }

            }catch(err){
                response(res, 500, 500, "something went wrong");
            }
        
        }
    
    })
    

}

// export const deleteProductos = async (req, res) => {

//     jwt.verify(req.token, process.env.SECRETWORD, async (err, datos) => {
//         if (err) {

//             response(res, 400, 105, "Something went wrong");
//             console.log("sapos hptas")
//         }

//         try {

//             const { id } = req.params;
//             const { Id_Rol_FK } = datos.user;

//             const permiso = adminPermissions(Id_Rol_FK);

//             if (!permiso) {
//                 response(res, 401, 401, "You don't have permissions");
//             }

//             //verify category exist

//             const producto = await getProID(id)

//             if (producto.length > 0) {

//                 const responses = await deleteProduc(id)


//                 response(res, 200, 200, responses);




//             } else {
//                 response(res, 200, 204, category);
//             }



//         } catch (err) {

//             if (err.errno) {

//                 response(res, 400, err.errno, err.code);

//             } else {
//                 response(res, 500, 500, "something went wrong");
//                 console.log(err)

//             }
//         }
//     })
// }

