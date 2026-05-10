const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
    res.json({message: 'Welcome to To Do API'});
});

module.exports = app;