const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');


require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ruqflxh.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    const taskImageCollection = client.db('taskImage').collection('imageCollection');
    app.get('/allImage', async(req,res)=>{
      const query = {};
      const images = await taskImageCollection.find(query).toArray();
      res.send(images);
    })


  }
  finally{

  }

}
run().catch(console.log);


app.get("/", (req, res) => {
  res.send("Assessment server us running");
});

app.listen(port, () => {
  console.log(`Assessment server is running on ${port}`);
});