const db = require('./db');
const bcrypt = require('bcrypt');

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

app.post('/register', async( req, res) =>{
  try{
  const { username, email, password } = req.body;
  }
  catch(err){
    return res.status(400).json({error: 'Invalid JSON'});
  }
  if(!username || !email || !password){
    return res.status(400).json({error: 'Missing required fields'});
  }
  
  try {
      const [existing] = await db.query('Select id from users where email = ? or username = ?', [email,username]);
      if (existing.length > 0){
        return res.status(400).json({ error: 'User already exists'});
      }
      const hashed = await bcrypt.hash(password, 10);
      await db.query('Insert into users (username, email, password) values (?,?,?)', [username,email,hashed]);
      res.status(201).json({ message:'User registered successfully'});
  }
  catch (err){
    res.status(500).json({error: err.message});
  }
})


app.listen(3000,() => {
    console.log("server running on localhost:3000");
})

