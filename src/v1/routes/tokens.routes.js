import express from 'express';
import {GetAllTokens, GetTokenssxUser,InsertToken, GetTokenssxTipo, UpdateTokens} from '../../controllers/tokens.controller.js'
import { verifyToken } from "../../middlewares/verifyToken.js";

const routesTokens = express();

//ALL OK

/**
 * @swagger
 * /api/v1/tokens:
 *   get:
 *     summary: Retorna la lista de todos los tokens (Solo rol de ADMIN)..
 *     description: Retorna la lista de todos los tokens desde la base de datos.
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Tokens
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
 *                 data: [{"Id_Token": 1,
        "Token": "xxxxxxxxx",
        "Fec_Caducidad": "xxxxxxx",
        "User_Id_FK": "1",
        "Tipo_token": "1"
                        }]
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
routesTokens.get('/api/v1/tokens', verifyToken, GetAllTokens)
/**
 * @swagger
 * /api/v1/tokens/user/{id}:
 *   get:
 *     summary: Retorna la lista de todos los tokens de un determinado usuario (Solo rol de ADMIN).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: rol id.
 *         schema:
 *           type: string
 *           minLenght: 1
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Tokens
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
 *                 data: [{"Id_Token": 1,
                         "Token": "xxxxxxxxx",
                         "Fec_Caducidad": "xxxxxxx",
                         "User_Id_FK": "1",
                         "Tipo_token": "1"
                        }]
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
routesTokens.get('/api/v1/tokens/user/:id',verifyToken, GetTokenssxUser)
/**
 * @swagger
 * /api/v1/tokens/type/{tipo}:
 *   get:
 *     summary: Retorna la lista de todos los tokens segun su tipo (Solo rol de ADMIN).
 *     parameters:
 *       - name: tipo
 *         in: path
 *         required: true
 *         description: # tipo de token.
 *         schema:
 *           type: string
 *           minLenght: 1
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Tokens
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
 *                 data: [{"Id_Token": 1,
                         "Token": "xxxxxxxxx",
                         "Fec_Caducidad": "xxxxxxx",
                         "User_Id_FK": "1",
                         "Tipo_token": "1"
                        }]
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
routesTokens.get('/api/v1/tokens/type/:tipo',verifyToken, GetTokenssxTipo)
/**
 * @swagger
 * /api/v1/tokens/create:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tokens
 *     summary: Crear una nuevo token (Solo para rol de ADMIN).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Token:
 *                 type: string
 *               Fec_Caducidad:
 *                 type: string
 *               Id_User:
 *                 type: string
 *               Tipo_token:
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
 *               data: {"insertId": "1"}
 *       '204':
 *         description: La operación se realizó correctamente, pero no hubo datos que devolver
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               type: success
 *               code: 204
 *               data: []
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
routesTokens.post('/api/v1/tokens/create',verifyToken, InsertToken);
/**
 * @swagger
 * /api/v1/tokens/update/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tokens
 *     summary: Actualizar tokens (Solo para rol de ADMIN).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id token.
 *         schema:
 *           type: string
 *           minLenght: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Token:
 *                 type: string
 *               Fec_Caducidad:
 *                 type: string
 *               Id_User:
 *                 type: string
 *               Tipo_token:
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
 *               data: {"affectedRows": 1}
 *       '204':
 *         description: La operación se realizó correctamente, pero no hubo datos que devolver
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *             example:
 *               type: success
 *               code: 204
 *               data: []
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
routesTokens.put('/api/v1/tokens/update/:id',verifyToken, UpdateTokens)


export default routesTokens;