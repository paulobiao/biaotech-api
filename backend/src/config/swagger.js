const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "BiaoTech API",
      version: "1.0.0",
      description:
        "Production-ready backend API built with Node.js, Express, PostgreSQL, Docker and AWS EC2 infrastructure.",
      contact: {
        name: "Paulo Biao",
        url: "https://github.com/paulobiao",
      },
    },

    servers: [
      {
        url: "https://api.biaotech.dev",
        description: "Production server",
      },
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],

    tags: [
      {
        name: "Health",
        description: "API monitoring and healthcheck endpoints",
      },
      {
        name: "Authentication",
        description: "JWT authentication endpoints",
      },
      {
        name: "Users",
        description: "User management endpoints",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token",
        },
      },

      schemas: {
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "admin@biaotech.dev",
            },
            password: {
              type: "string",
              example: "123456",
            },
          },
        },

        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Paulo Biao",
            },
          },
        },

        HealthResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            status: {
              type: "string",
              example: "ok",
            },
            database: {
              type: "string",
              example: "connected",
            },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;