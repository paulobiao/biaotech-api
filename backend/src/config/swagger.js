const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BiaoTech API",
      version: "1.0.0",
      description: "API documentation for BiaoTech backend project",
    },

    servers: [
      {
        url: "https://api.biaotech.dev",
        description: "Production server",
    
      },
      {
         url: "http://localhost:3000",
        description: "Local server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;