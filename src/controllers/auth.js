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

    const { email, senha } = req.body;



    // retornando uma promisse
    const hash = bcrypt.hashSync(senha, saltRounds);
    // const result = await Account.create({ email, senha: hash });

    return res.json({ email, senha: hash });
});

/* @export a const router */
module.exports = router;