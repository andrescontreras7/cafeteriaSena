import {GetInventarios} from '../../controllers/inventario.controller.js'
import express from "express";

const routesInventario = express();

routesInventario.get('/api/v1/inventarios', GetInventarios)

export default routesInventario;