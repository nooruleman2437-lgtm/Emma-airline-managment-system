const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Booking = require("./models/booking");
//manages server operations and API requests
const app = express();


// Middleware
app.use(cors());
app.use(express.json());//converts incoming JSON data into a JavaScript object so we can access it through req.body


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });


// Booking API
// when a customer submits a flight booking form, your frontend sends 
// the booking information to this endpoint.
app.post("/api/bookings", async (req, res) => {
    //error handling
//It contains the data sent by the frontend in the request body
    try {

        const {
            name,
            email,
            phone,
            passengers,
            from,
            to,
            date,
            travelClass
        } = req.body;


        // Check fields
        if (
            !name ||
            !email ||
            !phone ||
            !passengers ||
            !from ||
            !to ||
            !date ||
            !travelClass
        ) {

            return res.status(400).json({
                message: "Please fill all fields."
            });

        }


        // Check same cities
        if (from === to) {

            return res.status(400).json({
                message: "Departure and destination cannot be the same."
            });

        }


        // Create booking ID
        //We automatically generate a unique-looking booking reference for each booking.
        const bookingId = "SW" + Date.now();


        // Create booking
        const booking = new Booking({

            bookingId,
            name,
            email,
            phone,
            passengers,
            from,
            to,
            date,
            travelClass

        });


        // Save to MongoDB
        await booking.save();


        // Send response
        res.status(201).json({

            message: "Flight booked successfully!",
            bookingId: bookingId

        });


    } catch (error) {

        console.log(error);
//500 means Internal Server Error
        res.status(500).json({

            message: "Server error. Booking could not be completed."

        });

    }

});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});