import express from "express";
import {
  GetCategories,
  createCategories,
  GetCategoriesxId,
  UpdateCategories
} from "../../controllers/categorias.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

const routesCategorias = express();

/**
 * @swagger
 * /api/v1/categories/:
 *   get:
 *     summary: Retorna la lista de todas las categorias.
 *     description: Retorna la lista de todas las categorias desde la base de datos.
 *     tags:
 *      - Categorias
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
 *                 data: [{"Id_Cat": "1","Nom_Cat": "Programación"}]
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
 
routesCategorias.get("/api/v1/categories", GetCategories);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     tags:
 *      - Categorias
 *     summary: Retorna una categoria segun el id ingresado.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: category id.
 *         schema:
 *           type: string
 *           minLenght: 1
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
 *                 data: [{"Id_Cat": "1","Nom_Cat": "Programación"}]
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
 *       
 */

routesCategorias.get("/api/v1/categories/:id", GetCategoriesxId);

/**
 * @swagger
 * /api/v1/categories/create:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categorias
 *     summary: Crear una nueva categoría (Solo para rol de ADMIN).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nom_Cat:
 *                 type: string
 *             required:
 *               - Nom_Cat
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


routesCategorias.post("/api/v1/categories/create", verifyToken, createCategories);
/**
 * @swagger
 * /api/v1/categories/update/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categorias
 *     summary: Actualizar categorías (Solo para rol de ADMIN).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: category id.
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
 *               Nom_Cat:
 *                 type: string
 *             required:
 *               - Nom_Cat
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

routesCategorias.put(
  "/api/v1/categories/update/:id",
  verifyToken,
  UpdateCategories
);

/*
routesCategorias.delete(
  "/api/categories/delete/:id",
  verifyToken,
  DeleteCategories
);*/

export default routesCategorias;
