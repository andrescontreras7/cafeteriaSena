// proveedor.routes.js
import express from 'express';
import { getProveedor, createProveedor } from '../../controllers/proveedor.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

const routesProveedor = express.Router();

routesProveedor.get('/api/v1/proveedor', verifyToken, getProveedor);
routesProveedor.post('/api/v1/proveedor/create',verifyToken, createProveedor);

export default routesProveedor;
