/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const authCtrl = require('../controllers/auth_c')

/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/**********************************/
/*** Routage de la ressource Auth */

router.post('/login', authCtrl.login)

module.exports = router