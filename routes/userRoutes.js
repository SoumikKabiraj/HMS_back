const express =require('express')
const { loginController, registerController, authController ,applyDoctorController,getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController, getUserByIdController, getApprovedDoctorsController, getPescriptionByIdController } = require('../controllers/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

const router=express.Router()

//routes

//login
router.post('/login',loginController)
//register
router.post('/register',registerController)
//Authentication
router.post('/getUserData',authMiddleware, authController )
//ApplyDoctor
router.post('/apply-doctor',authMiddleware, applyDoctorController )
//NotificationDoctor
router.post('/get-all-notification',authMiddleware, getAllNotificationController )
//delete all notif
router.post('/delete-all-notification',authMiddleware, deleteAllNotificationController )
//get all doctor
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)
//get all approved Doctors
router.get('/getApprovedDoctors',authMiddleware,getApprovedDoctorsController)
//book an appointment
router.post('/book-appointment',authMiddleware,bookAppointmentController)
//booking availability
router.post('/booking-availability',authMiddleware,bookingAvailabilityController)
//get all the appointments posted
router.get('/user-appointments',authMiddleware,userAppointmentsController)
//get user
router.get('/profile',authMiddleware,getUserByIdController)
//get pescription info
router.get('/getpescription',authMiddleware,getPescriptionByIdController)


module.exports =router;