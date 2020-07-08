const express = require('express');
const db = require('./models');

const authController = require('./controllers/auth');

const app = express();

app.use('/auth', authController);

// request & response
app.get('/', (req, res) => {
    return res.json('API rodando...');
});

/* init db */
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Rodando na porta 3001');
    })
});