// const appointmentModel = require("../models/appointmentModel");
const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
const pescriptionModel = require('../models/pescriptionModel')

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Doctor Details",
    });
  }
};


const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update issue",
      error,
    });
  }
};

// //get single docotor
const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    
    res.status(200).send({
      success: true,
      message: "Doctor Info Fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fetching getDoctorByIdController Failed",
    });
  }
};

const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    console.log(req.body.userId);
    const appointments = await appointmentModel.find({
      doctorInfo: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};

const getapprovedappointments = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    console.log(req.body.userId);
    const appointments = await appointmentModel.find({
      doctorInfo: doctor._id,
      status: "approved"
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notifcation = user.notification;
    notifcation.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

const getappointmentbyIdController =async (req,res) =>{
    try {
      const doctor = await appointmentModel.findOne({ _id: req.body.appointmentId });
      
      res.status(200).send({
        success: true,
        message: "Appointment Info Fetched",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in fetching getappointmentbyIdController Failed",
      });
    }
}

const postpescriptionController =async(req, res)=>{
  try {
        console.log(req.body)
        const newPes = new pescriptionModel(req.body);
        
        const user = await userModel.findOne({ _id: req.body.patientId});
        const notification = user.notification;
        notification.push({
          type: "Pescription Posted",
          message: `Your Doctor has posted the pescription `,
          onClickPath: "/pescriptions",
        });
        await user.save();

        const meds = await appointmentModel.findByIdAndUpdate(
          req.body.appointmentId,
          { status: "Completed" }
        );
        await newPes.save();
        res.status(201).send({ message: "Posting Successfil", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: `Error in posting Pescription data ${error.message}`,
        });
    }
}




module.exports = {getDoctorInfoController,updateProfileController,getDoctorByIdController,doctorAppointmentsController,updateStatusController,getapprovedappointments,getappointmentbyIdController,postpescriptionController};
