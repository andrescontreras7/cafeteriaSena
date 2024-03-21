// index.js
import express from 'express';
import userRoutes from './v1/routes/users.routes.js';
import routesCategorias from './v1/routes/categorias.routes.js';
import routesLocation from './v1/routes/localizacion.routes.js';
import routesTokens from './v1/routes/tokens.routes.js';
import routesRoles from './v1/routes/roles.routes.js';
import routesProductos from './v1/routes/productos.routes.js';
import routesInventario from './v1/routes/inventario.routes.js';
import routesProveedor from './v1/routes/proveedor.routes.js';
import { swaggerDocs } from './v1/swagger.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());


// Rutas
app.use(userRoutes);
app.use(routesCategorias);
app.use(routesLocation);
app.use(routesTokens);
app.use(routesRoles);
app.use(routesProductos);
app.use(routesInventario);
app.use(routesProveedor);

app.listen(3000, () => {
    console.log('Server running on port 3000');
    swaggerDocs(app, 3000);
});