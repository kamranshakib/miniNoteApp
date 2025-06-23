import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'




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

export const singnup = async (req,res)=>{
  try {
    
     const newUser = await User.create(req.body);
     const token = jwt.sign({id: newUser._id},"kamranshakib",{expiresIn: '1d'})
     res.status(200).json({
        data: newUser,
        token
     })
  } catch (error) {
     res.status(500).json({
        state:'Field',
        data: 'someting was wrong while login user',
        error:error 
    })
  }
    
   
}

 
export const login = async (req,res , next)=>{
    try {
        
        const {email,password} = req.body;
        // 1): cheak exist email and password
        if(!email || !password){
            next(res.status(500).json({
                state: 'field',
                message: 'please provide email and password'
            }))
        }

        // 2): cheak is there same email in DB
        
    //   const cheakEmail = await  user.findOne({email}).select(+password);
      

    } catch (error) {
          res.status(500).json({
        state:'Field',
        data: 'someting was wrong while login user',
        error:error
    })
        
    }
}