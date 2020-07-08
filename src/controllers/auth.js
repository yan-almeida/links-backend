const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');

const router = express.Router();

// nº de vezes que a regra bcrypt sera executada
const saltRounds = 10;

router.get('/sign-in', (req, res) => {
    return res.json('Sign in!');
});

router.get('/sign-up', async(req, res) => {

    const email = 'yan@almeida.com';
    const senha = '123';

    const hash = bcrypt.hashSync(senha, saltRounds);
    console.log(hash);

    // retornando uma promisse
    const result = await Account.create({ email, senha: hash });

    return res.json(result);
});

/* @export a const router */
module.exports = router;