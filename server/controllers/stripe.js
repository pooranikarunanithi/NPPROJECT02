import User from "../models/user";
import Stripe from "stripe";
import queryString from 'query-string'

const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => { 

const user = await User.findById(req.user._id).exec();

console.log("USER ==>",user);

if(!user.stripe_account_id){
    const account = await stripe.accounts.create({type: 'express'});
    
    console.log("ACCOUNT ===>" ,account);
    
    user.stripe_account_id = account.id;
    user.save();

}

let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding",
  });
  // prefill any info such as email
  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });
   //console.log("ACCOUNT LINK", accountLink);
   let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  console.log("LOGIN LINK", link);
  res.send(link);

};


export const getAccountStatus = async (req, res) => {
   console.log("GET ACCOUNT STATUS");
  const user = await User.findById(req.user._id).exec();
  const account = await stripe.accounts.retrieve(user.stripe_account_id);
   console.log("USER ACCOUNT RETRIEVE", account);

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      stripe_seller: account
    }
  ).exec();
  console.log(updatedUser);
  res.json(updatedUser);
};





