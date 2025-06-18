import user from '../models/userModel.js'


export const singnup = async (req,res)=>{
   try {
     const newUser = await userModel.create(req.body);
    res.status(200).json({
        state:'Success',
        data:{
            User: newUser
        }
    })
   } catch (error) {
    res.status(500).json({
        state:'Field',
        data: 'someting was wrong while saving to database.',
        error:error
    })
   }
}
export const login = async (req,res , next)=>{
    try {
        
        const {email,password} = req.body;
        // 1): cheak exist email and password
        if(!email || !password){
            res
            .status(500)
            .json({
                state: 'field',
                message: 'please provide email and password'
            })
        }
        // 2): cheak is there same email in DB
      const cheakEmail = await  user.findOne({email}).select(+password);
      

    } catch (error) {
          res.status(500).json({
        state:'Field',
        data: 'someting was wrong while login user',
        error:error
    })
        
    }
}