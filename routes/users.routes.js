import express from "express";
import { insertUser ,getUserByName} from "../services/users.service.js";
import jwt from "jsonwebtoken";
const router=express.Router();
import bcrypt from "bcrypt";

async function genHashedPassword(password){
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);//random string
    const hashedPassword = bcrypt.hash(password,salt);
    // console.log(salt);
    // console.log(hashedPassword)
    return hashedPassword
  }
  

router.post("/signup",async function (request, response) {
  const {username,password,phone,email}=request.body;
  
  // db.films.insertMany({id:1})

  const userFromDb = await getUserByName(username);
 console.log(userFromDb);
 if (userFromDb){
    response.status(400).send({message:"UserName Already Exists"});
 }
 else if(password.length<8){
    response.status(400).send({message:"Password Must Be Atleast 8 Characters"});
 }
 else{
  const hashedPassword=await genHashedPassword(password);
//   console.log(password,hashedPassword);

  const result =await insertUser({
    username:username,
    email:email,
    phone:phone,
    password:hashedPassword
    
});
  response.send(result);
}
});

router.post("/login",async function (request, response) {
    const {username,password}=request.body;
    
    // db.films.insertMany({id:1})
  
    const userFromDb = await getUserByName(username);
   console.log(userFromDb);
   if (!userFromDb){
      response.status(400).send({message:"User Does Not Exist"});
   }
   else{
       const storedPassword=userFromDb.password;
       const isPasswordMatch= await bcrypt.compare(password,storedPassword)
       console.log(isPasswordMatch);
       if(isPasswordMatch){
         const token=jwt.sign({id:userFromDb._id},process.env.SECRET_KEY);
        response.send({message:"Sucessfully Login🎉🎉🎉" , token:token });
       }
       else{
        response.status(400).send({message:"Invalid Credentials"});
       }
   }
   
});

export default router;