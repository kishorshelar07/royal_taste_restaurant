const express = require('express');
const router = express.Router();
const {
  createReservation, getReservations,
  updateReservationStatus, deleteReservation, getStats,
} = require('../controllers/reservationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/',                   createReservation);           // public
router.get('/',         protect,   getReservations);             // admin
router.get('/stats',    protect,   getStats);                    // admin
router.patch('/:id/status', protect, updateReservationStatus);   // admin
router.delete('/:id',   protect,   deleteReservation);           // admin

module.exports = router;
