/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const userCtrl = require('../controllers/user_c')
const checkTokenMiddleware = require('../middelware/checkjwt')

/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()


/**********************************/
/*** Routage de la ressource User */

router.get('/', userCtrl.getAllUsers)

router.get('/:id([0-9]+)', userCtrl.getUser)

router.put('', userCtrl.addUser)

router.patch('/:id([0-9]+)', checkTokenMiddleware, userCtrl.updateUser)
    
router.delete('/:id([0-9]+)', checkTokenMiddleware, userCtrl.deleteUser)

module.exports = router