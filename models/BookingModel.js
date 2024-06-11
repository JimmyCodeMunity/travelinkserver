// models/Booking.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Booking schema
const BookingSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  seats: {
    type: [String],
    required: true,
  },

  vehicleId: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});
const Booking = mongoose.model("bookings", BookingSchema);

module.exports = Booking;
