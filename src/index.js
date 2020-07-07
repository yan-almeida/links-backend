const express = require('express');

const authController = require('./controllers/auth');

const app = express();

// /auth/sign-in
app.use('/auth', authController);

// request & response
app.get('/', (req, res) => {
    return res.json('API rodando...');
});

app.listen(3001, () => {
    console.log('Rodando na porta 3001');
})

/* 11min de video */