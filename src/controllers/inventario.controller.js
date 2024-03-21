import jsonwebtoken from "jsonwebtoken";
import 'dotenv/config';
import { response } from "../utils/responses.js";
import { GetInventario } from "../models/inventario.model.js";

const jwt = jsonwebtoken;

//get all inventario
export const GetInventarios = async (req, res) => {

    try {

        const inventario = await GetInventario();

        if (inventario.length > 0) {
            response(res, 200, 200, inventario);
        } else {
            response(res, 204, 204, inventario);
        }

    } catch (error) {

        if (err.errno) {

            response(res, 400, err.errno, err.code);

        } 
        
        else {
            response(res, 500, 500, "something went wrong");

        }
    }

}
