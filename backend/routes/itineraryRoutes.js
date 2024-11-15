// backend/routes/itineraryRoutes.js
const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary'); // Update path as needed

// Route to get all itineraries for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ user: req.params.userId });
    res.json(itineraries);
  } catch (error) {
    console.error('Error fetching itineraries:', error);
    res.status(500).json({ message: 'Error fetching itineraries' });
  }
});

// Route to create a new itinerary
router.post('/', async (req, res) => {
  try {
    const newItinerary = new Itinerary(req.body);
    await newItinerary.save();
    res.status(201).json(newItinerary);
  } catch (error) {
    console.error('Error creating itinerary:', error);
    res.status(500).json({ message: 'Error creating itinerary' });
  }
});

module.exports = router;
