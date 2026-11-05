const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        bookingId: {
            type: String,
            unique: true,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        passengers: {
            type: Number,
            required: true
        },

        from: {
            type: String,
            required: true
        },

        to: {
            type: String,
            required: true
        },

        date: {
            type: String,
            required: true
        },

        travelClass: {
            type: String,
            required: true
        },

        status: {
            type: String,
            default: "Confirmed"
        }

    },

    {
        timestamps: true
    }
);

//This creates a Model named Booking
module.exports =
    mongoose.model("Booking", bookingSchema);