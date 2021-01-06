const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', () => console.log(''));

// router.post(
//     '/signup',
//     [
//         check('name')
//             .not()
//             .isEmpty(),
//         check('email')
//             .normalizeEmail()
//             .isEmail(),
//         check('password').isLength({ min: 6 })        
//     ],

//     )

module.exports = router;