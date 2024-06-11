const express = require('express');
const { createAdmin, Login, findAllVehicles, findAllUsers, createDestination, findAllDestinations, createTrip, findAllTrips, getVehicleById } = require('../controllers/AdminController');
const { createVehicle } = require('../controllers/VehicleController');


const router = express.Router();
router.use(express.json());

//allow url encoding
router.use(express.urlencoded({extended:false}))

//create user router
router.post('/createadmin',createAdmin);

//create a new destination
router.post('/createdestination',createDestination);

//find all new destinations
router.get('/alldestinations',findAllDestinations);

//create a new vehicle
router.post('/createvehicle',createVehicle);

//create trip
router.post('/createtrip',createTrip);

//get all trips
router.get('/alltrips',findAllTrips);


//get all the vehicles
router.get('/getvehicles',findAllVehicles);

//get vehicle by id
router.get('/getvehicle/:id',getVehicleById);

//find all the users
router.get('/allusers',findAllUsers);

//find user  by email
// router.get('/user/:email',getAllUsersByEmail);

///user login
router.post('/login',Login);

module.exports = router;