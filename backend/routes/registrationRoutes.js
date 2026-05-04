const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const Registration = require('../models/Registration'); // Added locally for the getAllRegistrations

router.post('/:eventId', auth, registrationController.registerForEvent);
router.get('/my', auth, registrationController.getMyRegistrations);

// Admin routes
router.get('/admin/all', adminAuth, async (req, res) => {
    try {
        const registrations = await Registration.find().populate('user', 'name email').populate('event', 'name date');
        res.json(registrations);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});
router.get('/event/:eventId', adminAuth, registrationController.getEventRegistrations);
router.put('/:id/status', adminAuth, registrationController.updateRegistrationStatus);

module.exports = router;
