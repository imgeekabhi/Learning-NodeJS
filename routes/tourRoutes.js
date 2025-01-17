const express = require('express');
const tourController = require('../controllers/tourCountrollers');
const router = express.Router();

router.param('id', tourController.checkId);
router
  .route('/')
  .get(tourController.getTours)
  .post(tourController.checkBody, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
