import User from "../models/user"
import queryString from  "query-string"
const stripe =require("stripe")(process.env.STRIPE_SECRET);

export const makeInstructor = async (req,res) =>{
   try{
        //Logic
    // 1.Find user
    //2. make new stripe id for first time
    //create new link for payment
    //prefill emai
    
    //New User
    const user = await User.findById(req.user._id).exec();
    console.log(user);
  
        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: 'inr',
                  product_data: {
                    name: 'T-shirt',
                  },
                  unit_amount: 2000,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
           
            success_url: process.env.STRIPE_REDIRECT_URL,
            cancel_url: process.env.STRIPE_REDIRECT_URL,
          });
         
          user.stripe_account_id=session.payment_intent;
            user.save();
            console.log(session);
            console.log(`${session.url}`);
            res.send(`${session.url}`);
    }
 
catch (err) {
  console.log("MAKE INSTRUCTOR ERR ", err);
}

}


export const getAccountStatus = async (req,res) =>{
    try{
     
     const user = await User.findById(req.user._id).exec();
     
     let account =await stripe.paymentIntents.retrieve(user.stripe_account_id);
    // account.charges_enabled=true
     const statusUpdated=await User.findByIdAndUpdate(user._id,{
         stripe_seller:account,
         $addToSet:{role:'Instructor'},
     },{
         new:true
     }).select('-password').exec();

     res.json(statusUpdated);
     
    return;
     
 
     
    }catch(err){
        console.log(err);
    }
 
 
 }
 export const currentInstructor = async (req,res)=> {
   try {
    let user = await User.findById(req.user._id).select('-password').exec();
  if(!user.role.includes("Instructor")){
    return res.status(403);

  }else{
    res.json({ok:true});
  }
     
   } catch (err) {
    console.log(err);
   }
 }