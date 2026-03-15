const Reservation = require('../models/Reservation');

// POST /api/reservations — public
const createReservation = async (req, res) => {
  try {
    const { name, phone, email, guests, date, time, specialRequest } = req.body;

    if (!name || !phone || !email || !guests || !date || !time) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Check availability — max 10 reservations per time slot
    const existing = await Reservation.countDocuments({
      date: new Date(date),
      time,
      status: { $nin: ['cancelled'] },
    });
    if (existing >= 10) {
      return res.status(409).json({
        error: 'This time slot is fully booked. Please choose a different time.',
      });
    }

    const reservation = await Reservation.create({
      name, phone, email,
      guests: parseInt(guests),
      date: new Date(date),
      time,
      specialRequest: specialRequest || '',
    });

    res.status(201).json({
      message: `Reservation confirmed for ${name} on ${new Date(date).toDateString()} at ${time}`,
      reservation,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/reservations — admin
const getReservations = async (req, res) => {
  try {
    const { status, date } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (date) filter.date = new Date(date);

    const reservations = await Reservation.find(filter).sort({ createdAt: -1 });
    res.json({ count: reservations.length, reservations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/reservations/:id/status — admin
const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'seated', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });

    res.json({ message: 'Status updated', reservation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/reservations/:id — admin
const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/reservations/stats — admin dashboard stats
const getStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [total, todayCount, pending, confirmed] = await Promise.all([
      Reservation.countDocuments(),
      Reservation.countDocuments({ date: { $gte: today } }),
      Reservation.countDocuments({ status: 'pending' }),
      Reservation.countDocuments({ status: 'confirmed' }),
    ]);

    res.json({ total, today: todayCount, pending, confirmed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createReservation, getReservations, updateReservationStatus, deleteReservation, getStats };
