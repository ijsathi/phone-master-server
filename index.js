const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vsocy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("phoneMasters");
      const phoneCollection = database.collection("phones");
      
      // GET API
      app.get('/phones', async(req, res)=>{
        const cursor = phoneCollection.find({});
        const phones = await cursor.toArray();
        res.send(phones);
    });

    // GET Single Service
    // app.get('/phones/:id', async(req, res) =>{
    //     const id = req.params.id;
    //     console.log('getting specific service',id);
    //     const query = {_id: ObjectId (id) }
    //     const phones = await phoneCollection.findOne(query);
    //     res.json(phones);
    // });
    } 
    finally {
      // await client.close();
    }
  }
run().catch(console.dir);
 
app.get('/',(  req, res) =>{
    res.send('Hello,WOW Im here!')
})
 
app.listen(port, () => {
    console.log('Listening the port', port);
});
