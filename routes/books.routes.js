import express from "express";
import { insertBooks, getAllBooks } from "../services/books.service.js";
const router=express.Router();



router.get("/", async function (request, response) {
   
    const book = await getAllBooks(request);
  response.send(book);
  console.log(request.query) ;
});

router.post("/books",async function (request, response) {
    const data=request.body; 
    const result = await insertBooks(data);
    response.send(result);
  });

  export default router;
