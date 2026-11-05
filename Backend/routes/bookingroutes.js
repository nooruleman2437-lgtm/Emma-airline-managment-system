const express = require("express");
const router = express.Router();
//This imports the Booking Model from the models folder.
//We use this model to interact with MongoDB.
const Booking = require("../models/booking");

// CREATE BOOKING
// POST /api/bookings

//post() handles HTTP POST requests. use to create new record
router.post("/", async (req, res) => {
    try {

        const booking = new Booking(req.body);

        const savedBooking = await booking.save();

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking: savedBooking
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create booking",
            error: error.message
        });

    }
});

// GET ALL BOOKINGS
// GET /api/bookings

router.get("/", async (req, res) => {
    try {

        const bookings = await Booking.find();

        res.status(200).json({
            success: true,
            bookings: bookings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to get bookings",
            error: error.message
        });

    }
});


// GET ONE BOOKING
// GET /api/bookings/:id


router.get("/:id", async (req, res) => {
    try {

        const booking = await Booking.findById(
            //gets the ID from the URL.
            req.params.id
        );

        if (!booking) {

            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });

        }

        res.status(200).json({
            success: true,
            booking: booking
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error finding booking",
            error: error.message
        });

    }
});



// DELETE BOOKING
// DELETE /api/bookings/:id


router.delete("/:id", async (req, res) => {
    try {

        const deletedBooking =
            await Booking.findByIdAndDelete(
                req.params.id
            );

        if (!deletedBooking) {

            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Booking deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error deleting booking",
            error: error.message
        });

    }
});

//It allows you to send your booking routes from bookingRoutes.js to server.js.
module.exports = router;