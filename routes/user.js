const express = require('express')

const router = express.Router()

router.get('/user', (req, res) => {
    res.json({
        data: "hey you hit node dsadasdsaAPIadasdsadsa"
    })
})

module.exports = router;
