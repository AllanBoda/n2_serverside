const express = require('express');
const { prod } = require("../client/client.js");

let router = express.Router();

router.get('/prod', prod.all);
router.post('/prod', prod.create);
router.put('/prod/:cod', prod.update);
router.delete('/prod/:cod', prod.delete);

module.exports = { router };