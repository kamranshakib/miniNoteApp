import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const signToken  = id => {
   return jwt.sign({id},process.env.TOKEN_SECRET,{expiresIn: '1d'})
}


// get all users
export const getAlluser = async (req,res)=>{
    try {
        const AllUser = await User.find();
        
        res.status(201).json({
            state: 'Success',
            length: AllUser.length,
            data: AllUser
        })
        
    } catch (error) {
         res.status(500).json({
        state:'Field',
        data: 'someting was wrong while bring users',
        error:error 
    })
        
    }
}
     // sign up users 
export const singnup = async (req,res)=>{
  try {
    
     const newUser = await User.create(req.body);

     const token = signToken(newUser._id)
     res.status(200).json({
        data: newUser,
        token
     })
  } catch (error) {
     res.status(500).json({
        state:'Field',
        data: 'someting was wrong while sign up user',
        error:error 
    })
  }
    
    
}
    // login users     
 

    //  cheak that there is email or password ,
    //  cheak is there email in database
    //  cheak is password correct
    //  compare hash password

export const login = async (req,res,next)=>{
       
         const {email,password} = req.body;
        // 1): cheak exist email and password
        if(!email || !password){
            next(res.status(500).json({
                state: 'field',
                message: 'please provide email and password'
            }))
        }

        // 2): cheak is there same email in DB
         const user =await User.findOne({email}).select('+password');
         const correct =await user.correctPassword(password, user.password)
        
         if(!user || !correct){
            return next('please provide a valid user or password')

         }
         const token = signToken(user._id)
         res.status(201).json({
            status:"success",
            token
         })
       
        
         
    //   const cheakEmail = await  user.findOne({email}).select(+password);
      

    
}