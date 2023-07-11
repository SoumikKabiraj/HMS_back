const doctorModel =require('../models/doctorModel')
const userModel =require('../models/userModels')

const getAllUsersController = async(req,res)=>{
    try{
        const user=await userModel.find({})
        res.status(200).send({
            success:true,
            message:"users data",
            data:user
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in adminCtrl while fetching user data',
            error
        })
    }
}



const getAllDoctorsController = async(req,res)=>{
    try{
        const doc=await doctorModel.find({})
        res.status(200).send({
            success:true,
            message:"doctor data",
            data:doc
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in adminCtrl while getting doctor data',
            error
        })
    }
}

const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Account Status",
      error,
    });
  }
};


module.exports={getAllDoctorsController,getAllUsersController,changeAccountStatusController}