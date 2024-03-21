import { connection } from "../database/db.js";

//Obtiene las ordenes por id del usuario
export const GetInventario = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM inventario INNER JOIN productos ON inventario.producto_idFK = productos.id_Pro;",  (err, result) => {

            if (err) {
                const objError = {
                    errno: err.errno
                }
                reject(objError);
            } else {
                
                resolve(result);
            }

        })
    })
}
