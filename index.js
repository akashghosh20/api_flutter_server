const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion} = require('mongodb');



const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://api_server:api_server@cluster0.14res80.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{

        await client.connect();
        const productCollection = client.db('api_server').collection('products');

        app.get('/products', async(req, res) =>{
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })



    }
    finally{

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello From Api server!')
  })
   
  app.listen(port, () => {
    console.log(`Api server is listening on port ${port}`)
  })