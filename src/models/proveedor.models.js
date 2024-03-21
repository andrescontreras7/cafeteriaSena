import {connection} from "../database/db.js";

export const getProveedorModels = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM proveedor", (err, result) => {
            if (err){
               const  objetodeError= {
                errno:  err.errno,
                codde:err.code

                }
                    reject(objetodeError)
                }
            else{
                resolve(result)
            }
        })

    })
}

export const createProveedorModels = (datos) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO proveedor (id_ProvPK,nomb_Prov,fech_Reg, Est_Reg) VALUES (?,?,?,?)", [datos.id_ProvPK, datos.nomb_Prov, datos.fech_Reg, 1], (err, result) => {
            if (err) {
                console.log(err);
                const objetodeError ={
                    errno: err.errno,
                    code: err.code
                }
                reject(objetodeError);
            }else {
                resolve(result);
            }
        });
    });
};

export const getProvID = (id_Prov) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM proveedor WHERE id_ProvPK = ?", [id_Prov], (err, result) => {

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

export const UpdateProv = (datos) => {
    return new Promise((resolve, reject) => {

        connection.query("UPDATE proveedor SET nomb_Prov= ?, fech_Reg= ? WHERE id_ProvPK = ?", [datos.Nom_Cat, datos.id], (err, result) => {
                if (err) {
                    const objError = {
                        errno: err.errno
                    }
                    reject(objError);

                } else {
                    resolve(result);
                }

            });
    })
}

export const deleteProv = (id_Prov) => {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM proveedor WHERE id_ProvPK = ?", [id_Prov], (err, result) => {
            if (err) {
                console.log(err);
                const objError = {
                    errno: err.errno,
                    code: err.code
                }
                reject(objError);

            } else {
                resolve(result);

            }
        })
    })
}