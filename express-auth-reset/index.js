const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req,res) =>{
    res.send('Hello World!');
})

app.post('/echo', (req, res) => {
  res.json({ youSent: req.body });
});

app.listen(3000,() => {
    console.log("server running on localhost:3000");
})

