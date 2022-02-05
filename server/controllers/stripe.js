import User from "../models/user";
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => { 

const user = await User.findById(req.user._id).exec();

console.log("USER ==>",user);

//if(!user.stripe_account_id){
    const account = await stripe.accounts.create({type: 'express'});
    
    console.log("ACCOUNT ===>" ,account);
    
    //user.stripe.stripe_account_id =account.id;
    //user.save();
};


//console.log("REQ USER FROM REQUIRE_SIGNIN MIDDLEWARE",req.user);
    
//console.log('YOU HIT CREATE CONNECT ACCOUNTS ENDPOINT ');

