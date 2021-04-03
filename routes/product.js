const express = require('express')
const router = express.Router();

//middlewares
const {authCheck, adminCheck} = require('../middlewares/auth');

// controller
const { 
    create,
    listAll,
    read,
    searchFilters
} = require("../controllers/product");

router.get('/products/:count', listAll);
router.get('/product/:slug', read);

router.post('/product', authCheck, adminCheck, create);
router.post("/search/filters", searchFilters);

module.exports = router;