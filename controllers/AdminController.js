const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/AdminModel");
const User = require("../models/UserModel");
const Vehicle = require("../models/VehicleModel");
const Destination = require("../models/DestinationModel");
const Trip = require("../models/TripModel");

const createAdmin = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await Admin.create({
        fullname,
        email,
        password: hashedPassword,
      });
      res.status(200).json({ message: "Admin created Successfully", admin });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating new admin" });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding all users" });
  }
};

const findAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.status(200).json(vehicles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding all vehicles" });
  }
};

const getAllUsersByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.find({ email });
    if (!user) {
      res
        .status(404)
        .json({ message: "you have not added any user with that email" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "data not located" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: 7,
    });
    res.status(200).json({ admin: admin, token: token });
    // console.log({admin,token})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to login" });
  }
};

//create destination point
const createDestination = async (req, res) => {
  try {
    const { location } = req.body;
    const existingLocation = await Destination.findOne({ location });

    //check if exist
    if (existingLocation) {
      res.status(400).json({ message: "Destination already exists" });
      return;
    } else {
      const destination = await Destination.create({ location });
      res
        .status(200)
        .json({ message: "Destination created Successfully", destination });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating new destination" });
  }
};

//create trip
const createTrip = async (req, res) => {
  try {
    const {
      departure,
      destination,
      vehicleId,
      leavingTime,
      arrivalTime,
      price,
    } = req.body;
    const existingTrip = await Trip.findOne({ vehicleId });

    //check if exist
    if (existingTrip) {
      res.status(400).json({ message: "Trip already exists" });
      return;
    } else {
      const trip = await Trip.create({
        departure,
        destination,
        vehicleId,
        leavingTime,
        arrivalTime,
        price,
      });
      res
        .status(200)
        .json({ message: "Destination created Successfully", trip });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating new trip" });
  }
};

//get all destination
const findAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({});
    res.status(200).json(destinations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding all destinations" });
  }
};
//get all trips
const findAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find({});
    res.status(200).json(trips);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding all trips" });
  }
};


//get vehicle by id
const getVehicleById = async (req, res) => {
  try {
    // Get the ID from the request parameters
    const { id } = req.params;

    // Find the user by ID
    const vehicle = await Vehicle.findById(id);

    // If the user is not found, return a 404 response
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found with the provided ID' });
    }

    // If the user is found, return the user data
    res.status(200).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


//get admin data
const getAdminDataByEmail = async (req, res) => {
  try {
      const {email} = req.params;
      const admin = await Admin.find({email});
      if(!admin){
          res.status(404).json({message:'you have not added any admin with that email'});
      }
      res.status(200).json(admin);

  } catch (error) {
      console.log(error)
      res.status(500).json({ error: "data not located" })

  }
}

module.exports = {
  createAdmin,
  findAllUsers,
  getAllUsersByEmail,
  Login,
  findAllVehicles,
  createDestination,
  findAllDestinations,
  createTrip,
  findAllTrips,
  getVehicleById,
  getAdminDataByEmail
};
