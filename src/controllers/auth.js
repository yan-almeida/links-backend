const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');
const { accountSignUp } = require('../validators/account');
const { getMessages } = require('../helpers/messages');

const router = express.Router();

// nº de vezes que a regra bcrypt sera executada
const saltRounds = 10;

router.get('/sign-in', (req, res) => {
    return res.jsonOK(null);
});

router.get('/sign-up', accountSignUp, async(req, res) => {
    const { email, password } = req.body;

    const account = await Account.findOne({ where: { email } });
    if (account) return res.jsonBadRequest(null, getMessages('account.signup.email_exists'));

    // retornando uma promisse
    const hash = bcrypt.hashSync(password, saltRounds);
    const newAccount = await Account.create({ email, password: hash });

    return res.jsonOK(newAccount, getMessages('account.signup.success'));
});

/* @export a const router */
module.exports = router;