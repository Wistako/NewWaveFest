const express = require('express');
const router = express.Router();

const shortid = require('shortid');
const seatController = require('../controllers/seats.controller');

router.route('/seats').get(seatController.getAll);

router.route('/seats/:id').get(seatController.getOne);

router.route('/seats').post(seatController.addNew);

router.route('/seats/:id').put(seatController.changeOne);

router.route('/seats/:id').delete(seatController.delateOne);

module.exports = router;