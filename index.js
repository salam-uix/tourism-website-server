const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config()



const app = express();
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oiptd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('travelDaddy');
        const servicesCollection = database.collection('services')
        const bookingCollection = database.collection('booking')

        //GET Services API
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })

        //Add New services API
        app.post("/addNewServices", async (req, res) => {
            const result = await servicesCollection.insertOne(req.body);
            res.send(result);
        });

        //GET Booking API
        app.get('/booking', async (req, res) => {
            const cursor = bookingCollection.find({});
            const booking = await cursor.toArray();
            res.send(booking);
        })



        // GET Single service
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting specific service', id);
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.json(service);
        })

        //POST API
        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log('hit the post api', service);

            const result = await servicesCollection.insertOne(service);
            res.json(result)
        });

        //UPDATE API

        // DELETE API
        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await servicesCollection.deleteOne(query);
            res.json(result);
        })
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
