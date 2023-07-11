const express = require('express')
const authMiddleware =require("../middlewares/authMiddleware")
const { postController, getAllMediceneController, getMedicenebyId, postMediceneController, getAllOrders, getAllUserOrders } = require('../controllers/mediceneCtrl')

const router = express.Router()

router.post('/postmeds',authMiddleware,postController)
router.get('/getAllMedicenes',authMiddleware,getAllMediceneController)
router.post('/getOneMedicene',authMiddleware,getMedicenebyId)
router.post('/postbuymeds',authMiddleware,postMediceneController)
router.get('/getallorders',authMiddleware,getAllOrders)
router.get('/getalluserorders',authMiddleware,getAllUserOrders)

module.exports=router
