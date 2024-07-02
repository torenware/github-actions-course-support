import path from 'path';
import OS from 'os';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';

// Load the database from file
let planetsData = {};
try {
  const json = fs.readFileSync('./planets.json');
  planetsData = JSON.parse(json.toString());
  if (typeof planetsData !== 'array') {
    throw new Error('expected planets data to be an arry of object');
  }
} catch (e) {
  console.log()
}

const getPlanet = id => {
  return planetsData.find(planet => planet.id === id);
}

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors())


// var Schema = mongoose.Schema;

// var dataSchema = new Schema({
//     name: String,
//     id: Number,
//     description: String,
//     image: String,
//     velocity: String,
//     distance: String
// });
// var planetModel = mongoose.model('planets', dataSchema);



app.post('/planet',   async function(req, res) {
   // console.log("Received Planet ID " + req.body.id)
   try {
    const planetData = getPlanet(parseInt(req.body.id));
    if (!planetData) {
      throw new Error('planet not found');
    }
    res.send(planetData);
  } catch (err) {
    alert("Ooops, We only have 9 planets and a sun. Select a number from 0 - 9")
    res.send("Error in Planet Data")
  }
});

app.get('/',   async (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});


app.get('/os',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "os": OS.hostname(),
        "env": process.env.NODE_ENV
    });
})

app.get('/live',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "live"
    });
})

app.get('/ready',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "ready"
    });
})

app.listen(3000, () => {
    console.log("Server successfully running on port - " +3000);
})


export default app;