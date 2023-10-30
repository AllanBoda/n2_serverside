const express = require('express');
const { prod } = require("../client/client.js");

let router = express.Router();

router.get('/prod', prod.all);
router.get('/end/:cod', prod.end_point);
router.post('/prod', prod.create);
router.put('/prod/:cod', prod.update);
router.delete('/prod/:cod', prod.delete);

module.exports = { router };
