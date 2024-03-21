import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";


const options = {
    failOnErrors: false,
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SENALEARN API",
            version: '1.0.0',
        },

        components: {
            securitySchemes: {
                /* basicAuth: {
                     type: "http",
                     scheme: "basic"
                 },*/
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: ['src/v1/routes/categorias.routes.js', 'src/v1/routes/users.routes.js',
        'src/v1/routes/roles.routes.js','src/v1/routes/productos.routes.js','src/v1/routes/localizacion.routes.js','src/v1/routes/tokens.routes.js',
       ],
}

//documentation in format json
const openapiSpecification = swaggerJSDoc(options)

//function to setup our docs
export const swaggerDocs = (app, port) => {
    // ruta para acceder a la documentación Swagger
    app.use('/api/v1/docs', SwaggerUi.serve, SwaggerUi.setup(openapiSpecification, {

    }));

    //ruta para acceder a la documentación en formato JSON
    app.get('/api/v1/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(openapiSpecification);
    });

    console.log(`version 1 Docs are available at http://localhost:${port}/api/v1/docs`);
};