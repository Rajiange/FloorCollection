const express = require('express')
const app = express()
const port = 3000
const fetch = require('node-fetch')
const cors = require('cors');

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/opensea/myCollection/:id', async (req, res) => {
    let myCollection = req.query.nameCollection.split(',');
    let collectionData = new Array;
    for (let i = 0; i < myCollection.length; i++) {
        const pokemon_data = await fetch(`https://api.opensea.io/api/v1/collection/` + myCollection[i]);
        const data = await pokemon_data.json();
        collectionData.push({name: data.collection.name, floor_price: data.collection.stats.floor_price});
    }
    res.send(collectionData);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})