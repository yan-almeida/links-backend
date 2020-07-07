const express = require('express');

const app = express();

// request & response
app.get('/', (req, res) => {
    return res.json('API rodando...');
});

app.listen(3001, () => {
    console.log('Rodando na porta 3001');
})

/* 11min de video */