const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req,res) =>{
    // console.log(req.headers);
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
  const { username, email, password } = req.body;

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

app.post('/login', async( req, res) =>{
  const { email, password } = req.body;

  if (!email || !password){
    return res.status(400).json({error: "Email or password missing"});
  }

  try {
    const [users] = await db.query('select * from users where email = ?', [email]);

    const user = users[0];

    if (!user){
      return res.status(400).json({error: "Wrong email or password"});
    }

    const hashed = await bcrypt.compare(password, user.password);
    
    if (!hashed){
      return res.status(400).json({error: "Wrong Password"});
    }
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email}, process.env.JWT_SECRET, {expiresIn: '20s'});
    res.json({ message: "Login successful", token:token });
  }

  catch (err){
    res.status(500).json({error: err.message + ' at login'});
  }

});



app.listen(3000,() => {
    console.log("server running on localhost:3000");
})

