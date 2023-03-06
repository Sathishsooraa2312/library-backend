// const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
dotenv.config()
import cors from "cors";
import usersRouter from "./routes/users.routes.js"
import booksRouter from "./routes/books.routes.js"
const app = express();
app.use(cors())
const PORT = process.env.PORT;

const MONGO_URL=process.env.MONGO_URL;   
const client=new MongoClient(MONGO_URL) 
 await client.connect(); 
 console.log("Mongodb is connected");

 app.use(express.json());

app.get("/", function (request, response) {
  response.send("Sathish is Always Great");
});

app.use('/users',usersRouter);
app.use('/library',booksRouter);
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export {client};