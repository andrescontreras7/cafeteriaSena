import express from "express";
import {getUsers, loginUser, regUser,ValidateEmail, ValidateCod, UpdateUserData, getUserxId} from "../../controllers/users.controller.js"
import { verifyToken } from "../../middlewares/verifyToken.js";
import validateUserCreate from "../../validators/users.validators.js";

const userRoutes = express();

//get all users ---OK ---
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retorna una lista de usuarios.
 *     description: devuelve una lista de usuarios de la base de datos.
 *     tags:
 *      - Usuarios
 *     responses:
 *       '200':
 *         description: Operación correcta
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *              example:
 *                 type: success
 *                 code: 200
 *                 data: [{"Id_User": 40,"Nom_User": "user01","Ape_User": "ape01","Tel_User": 1234567890,"Ema_User": "user01@example.com","Id_Rol_FK": 2,"Fot_User": url.com,"Est_Email_User": 1}]
 *       '204':
 *         description: La operación se realizo correctamente, pero no hubo datos que devolver
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *              example:
 *                 type: success
 *                 code: 204
 *                 data: {[]}
 *       '403':
 *         description: No autorizado
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 403
 *                 message: No Autorizado
 *       '500':
 *         description: Error de servidor
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 500
 *                 message: algo salio mal
 *       '400':
 *         description:  la solicitud del cliente no pudo ser procesada por el servidor debido a problemas en la sintaxis o el formato de la solicitud
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 400
 *                 message: algo salio mal
 */
userRoutes.get('/api/v1/users', verifyToken, getUsers);

//get user by id ---ok ---
/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Retorna la informacion de un usuario mediante si Id.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: user id.
 *         schema:
 *           type: string
 *           minLenght: 1
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Usuarios
 *     responses:
 *       '200':
 *         description: Operación correcta
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *              example:
 *                 type: success
 *                 code: 200
 *                 data: [{"Id_User": 40,"Nom_User": "user01","Ape_User": "ape01","Tel_User": 1234567890,"Ema_User": "user01@example.com","Id_Rol_FK": 2,"Fot_User": url.com,"Est_Email_User": 1}]

 *       '204':
 *         description: La operación se realizo correctamente, pero no hubo datos que devolver
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *              example:
 *                 type: success
 *                 code: 204
 *                 data: {[]}
 *       '403':
 *         description: No autorizado
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 403
 *                 message: No Autorizado
 *       '500':
 *         description: Error de servidor
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 500
 *                 message: algo salio mal
 *       '400':
 *         description:  la solicitud del cliente no pudo ser procesada por el servidor debido a problemas en la sintaxis o el formato de la solicitud
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 400
 *                 message: algo salio mal
 */
userRoutes.get('/api/v1/users/:id', verifyToken, getUserxId);

//login user ---OK ---

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Inicio de sesion para usuarios.
 *     description: Brinda acceso a la plataforma.
 *     tags:
 *      - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Ema_User:
 *                 type: string
 *               Pass_User:
 *                 type: string
 *               Dir_Ip:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Operación correcta
 *         content:
 *           application/json:
 *              schema:
 *               type: object
 *               properties:
 *                  result:
 *                  type: object
 *              example:
 *                 result: {
 *                          "type": "success",
 *                          "code": 200,
 *                           "data": {
 *                           "codigo": "accesstoken",
 *                           "exp": 1708989763
 *                           }
 *                          }
 *       '108':
 *         description: Inicio de sesion correcto pero se detecto una nueva direccion IP (verificar codigo enviado a Email)
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *              example:
 *                 type: error
 *                 code: 108
 *                 data: 'Verification code send success (update new ip)'
 *       '103':
 *         description: Usuario o contraseña incorrectas
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *              example:
 *                 type: error
 *                 code: 103
 *                 data: 'Usuario o contraseña incorrectas'
 *       '204':
 *         description: La operación se realizo correctamente, pero no hubo datos que devolver
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *              example:
 *                 type: success
 *                 code: 204
 *                 data: {[]}
 *       '403':
 *         description: No autorizado
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 403
 *                 message: No Autorizado
 *       '500':
 *         description: Error de servidor
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 500
 *                 message: algo salio mal
 *       '400':
 *         description:  la solicitud del cliente no pudo ser procesada por el servidor debido a problemas en la sintaxis o el formato de la solicitud
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 400
 *                 message: algo salio mal
 */
userRoutes.post('/api/v1/login', loginUser);

//User Register ---ok--

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Registro para nuevos usuarios.
 *     description: Brinda acceso a la plataforma.
 *     tags:
 *      - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nom_User:
 *                 type: string
 *               Ape_User:
 *                 type: string
 *               Ema_User:
 *                 type: string
 *               Pass_User:
 *                 type: string
 *               Dir_Ip:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Operación correcta
 *         content:
 *           application/json:
 *              schema:
 *               type: object
 *               properties:
 *                  result:
 *                  type: object
 *              example:
 *                 result: {
 *                          "type": "success",
 *                          "code": 200,
 *                           "data": {
 *                           "insertId": "1",
 *                           }
 *                          }
 *       
 *       '500':
 *         description: Error de servidor
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 500
 *                 message: algo salio mal
 *       '400':
 *         description:  la solicitud del cliente no pudo ser procesada por el servidor debido a problemas en la sintaxis o el formato de la solicitud
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 400
 *                 message: algo salio mal
 */
userRoutes.post('/api/v1/register',validateUserCreate, regUser);

//validate Email to Register
/**
 * @swagger
 * /api/v1/email_validate:
 *   post:
 *     summary: Validar email para nuevos usuarios.
 *     description: Brinda acceso a la plataforma.
 *     tags:
 *      - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id_User:
 *                 type: string
 *               codigo:
 *                 type: string
 *     responses:
 *       '105':
 *         description: El token proporcionado no es valido
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *              example:
 *                 type: error
 *                 code: 105
 *                 data: 'Token invalido'
 *       '103':
 *         description: Los datos enviados no coinciden con los de la base de datos
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *              example:
 *                 type: error
 *                 code: 103
 *                 data: 'algo salio mal'
 *       '200':
 *         description: Operación correcta
 *         content:
 *           application/json:
 *              schema:
 *               type: object
 *               properties:
 *                  result:
 *                  type: object
 *              example:
 *                 result: {
 *                          "type": "success",
 *                          "code": 200,
 *                           "data": {
 *                           "affectedRows": 1,
 *                           }
 *                          }
 *       '500':
 *         description: Error de servidor
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 500
 *                 message: algo salio mal
 *       '400':
 *         description:  la solicitud del cliente no pudo ser procesada por el servidor debido a problemas en la sintaxis o el formato de la solicitud
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 400
 *                 message: algo salio mal
 */
userRoutes.post('/api/v1/email_validate', ValidateEmail);

//validate codes to login Ip new

/**
 * @swagger
 * /api/v1/code_validate:
 *   post:
 *     summary: Validar codigo cuando los usuarios ingresan con una nueva ip.
 *     description: Brinda seguridad a los usuarios.
 *     tags:
 *      - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id_User:
 *                 type: string
 *               codigo:
 *                 type: string
 *               Dir_Ip:
 *                 type: string
 *     responses:
 *       '105':
 *         description: El token proporcionado no es valido
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *              example:
 *                 type: error
 *                 code: 105
 *                 data: 'Token invalido'
 *       '103':
 *         description: Los datos enviados no coinciden con los de la base de datos
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *              example:
 *                 type: error
 *                 code: 103
 *                 data: 'Algo salio mal'
 *       '106':
 *         description: El token expiro
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *              example:
 *                 type: error
 *                 code: 106
 *                 data: 'algo salio mal'
 *       '200':
 *         description: Operación correcta
 *         content:
 *           application/json:
 *              schema:
 *               type: object
 *               properties:
 *                  result:
 *                  type: object
 *              example:
 *                 result: {
 *                          "type": "success",
 *                          "code": 200,
 *                           "data": {
 *                           "affectedRows": 1,
 *                           }
 *                          }
 *       '500':
 *         description: Error de servidor
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 500
 *                 message: algo salio mal
 *       '400':
 *         description:  la solicitud del cliente no pudo ser procesada por el servidor debido a problemas en la sintaxis o el formato de la solicitud
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 type: error
 *                 code: 400
 *                 message: algo salio mal
 */
userRoutes.post('/api/v1/ip_validation', ValidateCod);

//update user data

/**
 * @swagger
 * /api/v1/users/update:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Usuarios
 *     summary: Actualizar datos basicos de usuarios (Solo para rol de usuarios).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nom_User: 
 *                 type: string
 *               Ape_User: 
 *                 type: string
 *               Ema_User: 
 *                 type: string
 *               Dir_Ip:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Operación correcta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               type: success
 *               code: 200
 *               data: {"result": {"type": "success","code": 200,"data": {"affectedRows": 1}}}
 *       '403':
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               type: error
 *               code: 403
 *               message: No Autorizado
 *       '500':
 *         description: Error de servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               type: error
 *               code: 500
 *               message: algo salió mal
 *       '400':
 *         description: La solicitud del cliente no pudo ser procesada por el servidor debido a problemas en la sintaxis o el formato de la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               type: error
 *               code: 400
 *               message: algo salió mal
 */
userRoutes.put('/api/v1/users/update',verifyToken, UpdateUserData)



export default userRoutes;