const db = require('./db');

const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req,res) =>{
    res.send('Hello World!');
})

app.post('/echo', (req, res) => {
  res.json({ youSent: req.body });
});

app.get('/db-test', async(req,res) =>{
  try {
    const [rows] = await db.query('Select 1+1 AS solution');
    res.json({ mysqlWorks: rows[0].solution });
  }
  catch (err){
    res.status(500).json({error: err.message});
  }
})

app.listen(3000,() => {
    console.log("server running on localhost:3000");
})

