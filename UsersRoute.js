const router =require('express').Router();
const User=require('./UsersSchema') 
const bcrypt =require('bcryptjs')
const jwt=require("jsonwebtoken");

router.post('/register',async (req,res)=>{
   
  try{
       var EmailExist = await User.findOne({Email:req.body.Email});
       if(EmailExist){
         return  res.status(400).json("Email already exists");
       }
       //password hash
      var hash =  await bcrypt.hash(req.body.Password,10)
      const user = new User({
        Name :req.body.Name,
        Email:req.body.Email,
        Password:hash
    });
    var data = await user.save();
    res.json(data);
   }catch(err){
    res.json(err);
   }
  res.json(user)
});
router.post('/login',async (req,res)=>{
   try{
    var userData = await User.findOne({Email:req.body.Email})
    if(!userData){
         return res.status(400).json("Email not exists")
    }
    var validPsw = await bcrypt.compare(req.body.Password,userData.Password)
    if(!validPsw){
        return res.status(400).json("Password  not exists")
    }
    var userToken = await jwt.sign({Email:userData.Email},"sakthi123")
    res.header('auth',userToken).send(userToken);
   }catch(err){
      res.json(err)
   }
})

const validUser=(req,res,next)=>{
    var token=req.header('auth')
    req.token=token
    next();

}
router.get('/getAll',validUser,async (req,res)=>{

    jwt.verify(req.token,'sakthi123' ,async (err,data)=>{
        if(err){
            res.sendStatus(403)
        }else{
            const data= await User.find().select(['-Password']);

            res.json(data);
        }
    }) 
    
})



module.exports = router;