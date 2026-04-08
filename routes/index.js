var express = require('express');
var router = express.Router();

const categoriesRouter = require('./categories');
const productsRouter = require('./products');
const usersRouter = require('./users');
const commentsRouter = require('./comments');

router.use('/categories', categoriesRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/comments', commentsRouter);

module.exports = router;