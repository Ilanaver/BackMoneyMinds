// En postman se usa "localhost:3000"
//instalar npm i pg

import Gestor from '../src/Controllers/gestor-controller.js'
import Definiciones from '../src/Controllers/definiciones-controller.js'
import Multimedia from '../src/Controllers/multimedia-controller.js'
import express from "express"; // hacer npm i express
import cors from "cors"; // hacer npm i cors
const app = express();
const port = 3000;

app.use(cors());  
app.use(express.json()); 

app.get('/', function (req, res)  {
    res.status(200).send(`..........`)
  })


app.use('/gestor', Gestor)
app.use('/definiciones', Definiciones)
app.use('/contenido-multimedia', Multimedia)




  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })