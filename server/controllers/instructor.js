import User from "../models/user"
import querystring from  "query-string"
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
    if(!user.stripe_account_id){
        const account=await stripe.accounts.create({
            type: 'custom',
      business_type: 'individual',
      requested_capabilities: ['card_payments', 'transfers'],
        
        });
        //console.log("Acc ->",account.id);
        user.stripe_account_id=account.id;
        user.save();

    }
    //Linking
    // let accountLink= await stripe.accountLinks.create({
        
    //     account:user.stripe_account_id,
    //     refresh_url:process.env.STRIPE_REDIRECT_URL,
    //     return_url:process.env.STRIPE_REDIRECT_URL,
    //     type: 'custom_account_verification',
    //     collect: 'eventually_due',
    // });
    let accountLink=process.env.STRIPE_REDIRECT_URL
  
    console.log("Account Link => ",accountLink)

    //Send link to client

    res.send(`${accountLink}`);
   }catch(err){
       console.log(err);
   }


}


export const getAccountStatus = async (req,res) =>{
    try{
     
     const user = await User.findById(req.user._id).exec();
     
     let account =await stripe.accounts.retrieve(user.stripe_account_id);
     account.charges_enabled=true
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