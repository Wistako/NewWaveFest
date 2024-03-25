const express = require('express');
const router = express.Router();

const shortid = require('shortid');
const testimonialsController = require('../controllers/testimonials.controller');


router.route('/testimonials').get(testimonialsController.getAll);


router.route('/testimonials/:id').get(testimonialsController.getOne);

router.route('/testimonials/random').get(testimonialsController.getRandom);

router.route('/testmonials').post(testimonialsController.addNew);

router.route('/testimonials/:id').put(testimonialsController.changeOne);

router.route('/testimonials/:id').delete(testimonialsController.delateOne);

module.exports = router;