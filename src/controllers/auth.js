const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');
const { accountSignUp, accountSignIn } = require('../validators/account');
const { getMessages } = require('../helpers/messages');
const { generateJwt, generateRefreshJwt } = require('../helpers/jwt');

const router = express.Router();

// nº de vezes que a regra bcrypt sera executada
const saltRounds = 10;

router.post('/sign-in', accountSignIn, async(req, res) => {
    const { email, password } = req.body;
    const account = await Account.findOne({ where: { email } });

    const match = account ? bcrypt.compareSync(password, account.password) : null;
    if (!match) return res.jsonBadRequest(null, getMessages('account.signin.invalid'));

    const token = generateJwt({ id: account.id });
    const refreshToken = generateRefreshJwt({ id: account.id });

    return res.jsonOK(account, getMessages('account.signin.success'), { token, refreshToken });
});

router.post('/sign-up', accountSignUp, async(req, res) => {
    const { email, password } = req.body;

    const account = await Account.findOne({ where: { email } });
    if (account) return res.jsonBadRequest(null, getMessages('account.signup.email_exists'));

    const hash = bcrypt.hashSync(password, saltRounds);
    const newAccount = await Account.create({ email, password: hash });

    const token = generateJwt({ id: newAccount.id });
    const refreshToken = generateRefreshJwt({ id: newAccount.id });

    return res.jsonOK(newAccount, getMessages('account.signup.success'), { token, refreshToken });
});

// min - ep 2 
/* @export a const router */
module.exports = router;