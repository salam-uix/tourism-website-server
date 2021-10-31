const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config()



const app = express();
const port = 5000;

//user: travelDaddy
//pass: dX6B6wDX4Aj9vOxH

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oiptd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('databse connected')
    }
    finally {
        // await await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('travel daddy server');
})


app.listen(port, () => {
    console.log('Listening to port', port);
})
