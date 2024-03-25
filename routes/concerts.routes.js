const express = require('express');
const router = express.Router();

const shortid = require('shortid');
const concertController = require('../controllers/concerts.controller');

router.route('/concerts').get(concertController.getAll);

router.route('/concerts/:id').get(concertController.getOne);
  
router.route('/concerts').post(concertController.addNew);

router.route('/concerts/:id').put(concertController.changeOne);

router.route('/concerts/:id').delete(concertController.deleteOne);

module.exports = router;