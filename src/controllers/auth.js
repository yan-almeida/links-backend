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

    const account = await Account.findOne({ where: { email } });
    if (account) return res.jsonBadRequest(null, 'Dados já cadastrados.');

    // retornando uma promisse
    const hash = bcrypt.hashSync(senha, saltRounds);
    const newAccount = await Account.create({ email, senha: hash });

    return res.jsonOK(newAccount, 'Conta criada com sucesso!');
});

/* @export a const router */
module.exports = router;