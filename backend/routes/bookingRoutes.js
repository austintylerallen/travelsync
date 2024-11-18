const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/authMiddleware');
const { createFlightOrder } = require('../services/flightOrderService');

// router.post('/book', authMiddleware, async (req, res) => {
//   try {
//       const { departureTime, arrivalTime, price, passengerInfo, ...otherData } = req.body;

//       if (!departureTime || !arrivalTime || !price || !passengerInfo) {
//           return res.status(400).json({ message: 'Missing required booking fields.' });
//       }

//       const flightOrderResponse = await createFlightOrder(
//           {
//               origin: otherData.origin,
//               destination: otherData.destination,
//               carrierCode: otherData.carrierCode,
//               flightNumber: otherData.flightNumber,
//               departureTime,
//               arrivalTime,
//               price,
//           },
//           [passengerInfo]
//       );

//       if (USE_MOCK_DATA) {
//           console.log('Mock Flight Order Response:', flightOrderResponse);
//       }

//       const bookingData = {
//           ...otherData,
//           user: req.user._id,
//           departureTime: new Date(departureTime),
//           arrivalTime: new Date(arrivalTime),
//           price: parseFloat(price.total),
//           passengerInfo,
//           flightOrderId: flightOrderResponse.data.id, // Mock or real ID
//       };

//       const newBooking = new Booking(bookingData);
//       await newBooking.save();

//       res.status(201).json({
//           message: 'Booking created successfully.',
//           bookingId: newBooking._id,
//       });
//   } catch (error) {
//       console.error('Booking creation error:', error.message);
//       res.status(500).json({ message: 'Booking failed', error: error.message });
//   }
// });




router.post('/book', authMiddleware, async (req, res) => {
  try {
    const useMockData = req.headers['x-mock-data'] === 'true' || process.env.REACT_APP_USE_MOCK_DATA === 'true';

    if (useMockData) {
      console.log('Using mock data for flight order.');
      const { mockFlightOrderResponse } = require('../services/mockData');
      return res.status(200).json({ bookingId: mockFlightOrderResponse.bookingId }); // Return mock bookingId
    }

    const { departureTime, arrivalTime, price, passengerInfo, ...otherData } = req.body;
    if (!departureTime || !arrivalTime || !price || !passengerInfo) {
      return res.status(400).json({ message: 'Missing required booking fields.' });
    }

    const flightOrderResponse = await createFlightOrder(otherData, [passengerInfo]);
    if (!flightOrderResponse.data?.id) {
      throw new Error('Flight order creation failed: Missing flight order ID.');
    }

    const bookingData = {
      ...otherData,
      user: req.user._id,
      departureTime: new Date(departureTime),
      arrivalTime: new Date(arrivalTime),
      price: parseFloat(price.total),
      passengerInfo,
      flightOrderId: flightOrderResponse.data.id,
    };

    const newBooking = new Booking(bookingData);
    await newBooking.save();

    res.status(201).json({ bookingId: newBooking._id });
  } catch (error) {
    console.error('Booking creation error:', error.message);
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
});






// GET /api/bookings
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Fetch bookings associated with the authenticated user
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 }); // Sort by most recent
    res.status(200).json({ message: 'Bookings retrieved successfully.', bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to retrieve bookings', error: error.message });
  }
});

// DELETE /api/bookings/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Find the booking and delete it
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    res.status(200).json({ message: 'Booking cancelled successfully.' });
  } catch (error) {
    console.error('Error cancelling booking:', error.message);
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
});

// PUT /api/bookings/:id (Optional: To allow updating booking details)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Ensure user is authorized to update this booking
    const booking = await Booking.findOneAndUpdate(
      { _id: id, user: req.user._id },
      updates,
      { new: true } // Return the updated document
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or not authorized.' });
    }

    res.status(200).json({ message: 'Booking updated successfully.', booking });
  } catch (error) {
    console.error('Error updating booking:', error.message);
    res.status(500).json({ message: 'Failed to update booking', error: error.message });
  }
});

module.exports = router;
