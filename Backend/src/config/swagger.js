const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const routesPath = path.join(__dirname, "../routes");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "To Do API Center",
      version: "1.0.0",
      description: "To Do Application APIs",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    tags: [
      {
        name: "Todos",
        description: "To Do Management APIs"
      },
    ],
  },

  apis: [path.join(routesPath, "todos.js")], // Route for Server and todos
};

const swaggerSpec = swaggerJsdoc(options);
console.log("📋 Swagger found these endpoints:", Object.keys(swaggerSpec.paths || {}));
module.exports = swaggerSpec;