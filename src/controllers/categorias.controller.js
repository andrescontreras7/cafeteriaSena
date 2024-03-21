import jsonwebtoken from "jsonwebtoken"
import { adminPermissions } from "../utils/manage.permissions.js";
import Categorias from "../models/categorias.model.js";
import 'dotenv/config'
import uniqid from 'uniqid';
import { response } from "../utils/responses.js";


const jwt = jsonwebtoken;

//get all categories
export const GetCategories = async (req, res) => {

    try {

        const categorias = await Categorias.findAll();

        if (categorias) {
            response(res, 200, 200, categorias);
        } else {
            response(res, 404);
        }

    } catch (error) {
        response(res, 500, 500, error);
    }

}

//get  category by id
export const GetCategoriesxId = async (req, res) => {

    try {
        const { id } = req.params;

        const categoria = await Categorias.findByPk(id)

        if (categoria) {
            response(res, 200, 200, categoria);
        } else {
            response(res, 404);
        }


    } catch (err) {
        response(res, 500, 500, "something went wrong");
    }

}

// create categories
export const createCategories = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 500, 105, "Something went wrong");
        } else {

            try {

                const Id_Cat = uniqid();

                const { Nom_Cat } = req.body;

                if (!Nom_Cat) {

                    response(res, 400, 102, "Something went wrong");

                } else {

                    //verify user permissions
                    const adminPermiso = adminPermissions(data.user.Id_Rol_FK);

                    if (!adminPermiso) {

                        response(res, 403, 403, "you dont have permissions");
                    } else {

                        //verificamos que no exista una categoria con el mismo nombre
                        const categoriaExists = await Categorias.findOne({ where: { Nom_Cat: Nom_Cat } })


                        if (categoriaExists) {

                            response(res, 500, 107, "category already exist");

                        } else {

                            //create category
                            const datos = {
                                Id_Cat: Id_Cat,
                                Nom_Cat: Nom_Cat.toLowerCase()
                            }

                            const newCategory = await Categorias.create(datos);
                            if (newCategory) {
                                response(res, 200)
                            } else {
                                response(res, 500, 500, "Error creating")
                            }

                        }
                    }
                }
            } catch (err) {

                response(res, 500, 500, "something went wrong");

            }


        }




    })
}

//update categorias
export const UpdateCategories = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, dat) => {
        if (err) {
            response(res, 400, 105, "Something went wrong");
        } else {

            try {
                const { Id_Rol_FK } = dat.user;

                let adPermision = adminPermissions(Id_Rol_FK);


                if (adPermision) {

                    //Data
                    const { id } = req.params;
                    const { Nom_Cat } = req.body;

                    //verify exist category

                    const category = await Categorias.findByPk(id)

                    if (!category) {

                        response(res, 404, 404, "Category don't exist");

                    } else {

                        const datos = {
                 
                            Nom_Cat: Nom_Cat
                        }

                        const responses = await Categorias.update(datos,{where:{Id_Cat: id}})
                        
                        if(responses){
                            response(res, 200)
                        }else{
                            response(res, 500, 500, "Error updating")
                        }

                    }

                } else {
                    response(res, 401, 401, "You don't have permissions");
                }

            } catch (err) {

                    response(res, 500, 500, "something went wrong");
                
            }
        }


    })
}
