import { client } from "../index.js";

export async function insertBooks(data) {
    return client.db("library").collection("books1").insertMany(data);
}

export async function getAllBooks(request) {
    return await client
        .db("library")
        .collection("books")
        .find(request.query)
        .toArray();
}