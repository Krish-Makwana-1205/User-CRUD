const express = require('express');
const {insertuser, getall, findoneuser, patch_user, delete_user} = require('../controller/user');
const router = express.Router();

router.post('/',insertuser);
router.get('/',getall);
router.get('/:id',findoneuser);
router.patch('/:id',patch_user);
router.delete('/:id',delete_user);

module.exports = {
    router
}