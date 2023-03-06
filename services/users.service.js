import { client } from "../index.js";


export async function insertUser(data) {
    return client.db("library").collection("users").insertOne(data);
}
export async function getUserByName(username) {
    return await client
        .db("library")
        .collection("users")
        .findOne({ username : username });
}

