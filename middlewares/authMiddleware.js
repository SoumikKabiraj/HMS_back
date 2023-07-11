const JWT= require('jsonwebtoken');

module.exports = async(req,res,next)=>{
    try{
    const token=req.headers['authorization'].split(" ")[1];
    // console.log(token);
    JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err){
            // console.log(err);
            return res.status(200).send({
                message:'Authentication Failed 1',
                success: false
            })
        }else{
            req.body.userId = decode.id
            next()
        }
    })
    }catch(error){
        console.log(error)
        res.status(401).send({
            message:'Authentication Failed 2',
            success:false
        })
    }
}