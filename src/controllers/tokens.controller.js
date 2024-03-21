
import { response } from "../utils/responses.js";
import jsonwebtoken from 'jsonwebtoken'
import {adminPermissions } from "../utils/manage.permissions.js";
import 'dotenv/config.js'
import Token from "../models/tokens.model.js";
import Usuario from "../models/users.model.js";
const jwt = jsonwebtoken;

export const GetAllTokens = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 500, 105, "Something went wrong");
        } else {

            try {
                //verify permissions
                const { Id_Rol_FK } = data.user;

                let adPermision = adminPermissions(Id_Rol_FK);

                if (adPermision) {

                    const tokens = await Token.findAll();
                    if (tokens) {
                        response(res, 200, 200, tokens);
                    } else {
                        response(res, 404, 404, 'Not found');
                    }

                } else {
                    response(res, 403, 403, "you dont have permissions");
                }

            } catch (err) {

                if (err.errno) {
                    response(res, 500, 500, "something went wrong");
                } else {
                    response(res, 500, 500, "something went wrong");
                }
            }
        }
    })

}

//get  TOKENS by user id --ok
export const GetTokenssxUser = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        if (err) {
            response(res, 500, 105, "Something went wrong");
        } else {

            try {
                //verify permissions
                const { Id_Rol_FK } = data.user;
                let adPermision = adminPermissions(Id_Rol_FK);

                if (adPermision) {
                    const { id } = req.params;


                    const tokens = await Token.findOne({ where: { User_Id_FK: id } });

                    if (tokens) {
                        response(res, 200, 200, tokens);
                    } else {
                        response(res, 204, 204, tokens);
                    }


                } else {
                    response(res, 403, 403, "you dont have permissions");
                }

            } catch (err) {

                response(res, 500, 500, "something went wrong");
            }


        }
    })

}

//get  TOKENS by type --ok
export const GetTokenssxTipo = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {
        if (err) {
            response(res, 500, 105, "Something went wrong");
        } else {

            try {
                //verify permissions
                const { Id_Rol_FK } = data.user;
                let adPermision = adminPermissions(Id_Rol_FK);

                if (adPermision) {
                    const { tipo } = req.params;

                    if (tipo) {

                        const tokens = await Token.findOne({ where: { Tipo_token: tipo } });

                        if (tokens) {
                            response(res, 200, 200, tokens);
                        } else {
                            response(res, 404, 404, tokens);
                        }
                    }

                }

            } catch (err) {

                response(res, 500, 500, "something went wrong");

            }


        }
    })

}

// Insert Tokens --ok
export const InsertToken = async (req, res) => {

    jwt.verify(req.token, process.env.SECRETWORD, async (err, data) => {

        if (err) {
            response(res, 500, 105, "Something went wrong");
        } else {

            // verify permissions
            const { Id_Rol_FK } = data.user;
            let adPermision = adminPermissions(Id_Rol_FK);

            if (adPermision) {

                try {

                    const { Tokens, Fec_Caducidad, Id_User, Tipo_token } = req.body;
                    console.log(Tokens, Fec_Caducidad, Id_User, Tipo_token)

                    //verificamos que exista el usuario
                    const UserExists = await Usuario.findByPk(Id_User);

                    if (!UserExists) {

                        response(res, 500, 103, "User don't exist");

                    } else {

                        //create tokens
                        const datos = {
                            Token: Tokens,
                            Fec_Caducidad: Fec_Caducidad,
                            User_Id_FK: Id_User,
                            Tipo_token: Tipo_token
                        }

                        const newToken = await Token.create(datos);
                        if (newToken) {
                            response(res, 200);
                        } else {
                            response(res, 500, 500, "error creating token");
                        }

                    }

                } catch (err) {

                    response(res, 500, 500, "something went wrong");
                }

            } else {
                response(res, 403, 403, "you dont have permissions");
            }

        }



    })
}

//update Tokens --ok
export const UpdateTokens = async (req, res) => {

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
                let datosEnv;

                //verify token exist
                let token = await Token.findByPk(id)

                if (!token) {

                    response(res, 404, 404, "Token not found");

                } else {
                    token = token.dataValues;

                    //user verify exist
                    if (datos.Id_User) {

                        const userExist = await Usuario.findByPk(datos.Id_User);
                        if (!userExist) {

                            response(res, 500, 103, "User don't exist");

                        } else {

                            datosEnv = {
                                Token: datos.Tokens || token.Token,
                                User_Id_FK: datos.Id_User,
                                Fec_Caducidad: datos.Fec_Caducidad || token.Fec_Caducidad,
                                Tipo_token: datos.Tipo_token || token.Tipo_token
                            }

                            const responses = await Token.update(datosEnv, { where: { Id_Token: id } })
                            if (responses) {
                                response(res, 200, 200);
                            }

                        }

                    } else {

                        datosEnv = {
                            Id_Token: id,
                            Token: datos.Token || token.Token,
                            User_Id_FK: datos.Id_User || token.Id_User_FK,
                            Fec_Caducidad: datos.Fec_Caducidad || token.Fec_Caducidad,
                            Tipo_token: datos.Tipo_token || token.Tipo_token
                        }

                        const responses = await Token.update(datosEnv, { where: { Id_Token: id } })

                        if (responses) {
                            response(res, 200, 200);
                        }

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