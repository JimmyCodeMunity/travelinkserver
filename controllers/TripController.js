const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Trip = require("../models/TripModel");

const createTrip = async (req, res) => {
  try {
    const { vehicleid, departure, arrival, status, from, to,price } = req.body;

    const existingTrip = await Trip.findOne({ vehicleid });

    if (existingTrip) {
      res.status(400).json({ message: "Trip already exists" });
    } else {
      
      const trip = await Trip.create({
        vehicleid,
        departure,
        arrival,
        status,
        from,
        to,
        price
      });
      res.status(200).json({ message: "User created Successfully", trip });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating new user" });
  }
};

const findAllTrips = async (req, res) => {
  try {
    const trip = await Trip.find({});
    res.status(200).json(trip);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding all users" });
  }
};

const getTripById = async (req, res) => {
  try {
    const { _id } = req.params;
    const trip = await Trip.find({ _id });
    if (!trip) {
      res
        .status(404)
        .json({ message: "you have not added any user with that email" });
    }
    res.status(200).json(trip);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "data not located" });
  }
};



module.exports = {
  createTrip,
  getTripById,
  findAllTrips
};
