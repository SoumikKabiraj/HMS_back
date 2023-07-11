const userModel =require('../models/userModels')
const mediceneModel =require('../models/mediceneModel')
const buymediceneModel =require('../models/buymediceneModel')

const postController = async (req, res) => {
    try {
        const newMed = new mediceneModel(req.body);
        await newMed.save();
        res.status(201).send({ message: "Posting Successfil", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: `Error in posting Med data ${error.message}`,
        });
    }
};

const getAllMediceneController= async(req,res)=>{
  try{
    const medicene = await mediceneModel.find()
    res.status(200).send({
      success: true,
      message: "Medicene list received",
      data: medicene
    })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to get Medicene Info error in GetAllMediceneController",
      error
    })
  }
};


const getMedicenebyId = async (req, res) => {
  try {
    const meds = await mediceneModel.findOne({ _id: req.body.medsId });
    
    res.status(200).send({
      success: true,
      message: "Medicene Info Fetched",
      data: meds,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fetching... getMediceneByIdController Failed",
    });
  }
};

const postMediceneController = async (req, res) => {
    try {
      // console.log(req.body);
      const { medId, orderqty,medName } = req.body;
      const medicene = await mediceneModel.findOne({ _id: medId });
        const meds = await mediceneModel.findByIdAndUpdate(
          medId,
          { qty: medicene.qty-orderqty }
        );
        if(medicene.qty-orderqty<100){
          const user = await userModel.find({ isAdmin: true});
          const notification = user[0].notification;
          notification.push({
            type: "Low Medicene Count",
            message: `Only ${medicene.qty-orderqty} Units remaining on ${medName} please refill`,
            onClickPath: "/",
          });
          await user[0].save();
        }
        const neworder = new buymediceneModel(req.body);
        await neworder.save();
        res.status(201).send({ message: "Posting order Successfil", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: `Error in posting Med  order data ${error.message}`,
        });
    } 
};




const getAllOrders= async(req,res)=>{
  try{
    const user = await buymediceneModel.find({userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "All medicene List recieved",
      data: user
    })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to get Order List",
      error
    })
  }
};

const getAllUserOrders= async(req,res)=>{
  try{
    const user = await buymediceneModel.find();
    res.status(200).send({
      success: true,
      message: "All medicene List recieved",
      data: user
    })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to get Order List",
      error
    })
  }
};

module.exports = { postController , getAllMediceneController, getMedicenebyId, postMediceneController,getAllOrders,getAllUserOrders }