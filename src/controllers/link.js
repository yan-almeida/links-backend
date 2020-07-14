const express = require('express');

const { Link } = require('../models');

const router = express.Router();

// Create
router.post('/', async(req, res) => {
    const { accountId, body } = req;
    const { label, url, isSocial } = body;
    const image = 'http://google.com/image.jpg';

    const link = await Link.create({ label, url, isSocial, image, accountId });

    return res.jsonOK(link);
});

// Read one 
router.get('/:id', async(req, res) => {
    const { accountId } = req;
    const { id } = req.params;
    const link = await Link.findOne({ where: { id, accountId } });
    if (!link) return res.jsonNotFound();

    return res.jsonOK(link);
});

// Read all
router.get('/', async(req, res) => {
    const { accountId } = req;
    const links = await Link.findAll({ where: { accountId } })

    return res.jsonOK(links);
});

// Update
router.put('/:id', async(req, res) => {
    const { accountId, body } = req;
    const { id } = req.params;
    const fields = ['label', 'url', 'isSocial'];

    const link = await Link.findOne({ where: { id, accountId } });
    if (!link) return res.jsonNotFound();

    fields.map((fieldName) => {
        const newValue = body[fieldName];
        if (newValue != null) link[fieldName] = newValue;

    });

    await link.save();

    return res.jsonOK(link);
});

// Delete
router.delete('/:id', async(req, res) => {
    const { accountId } = req;
    const { id } = req.params;

    const link = await Link.findOne({ where: { id, accountId } });
    if (!link) return res.jsonNotFound();

    await link.destroy();

    return res.jsonOK(link);
})

module.exports = router;