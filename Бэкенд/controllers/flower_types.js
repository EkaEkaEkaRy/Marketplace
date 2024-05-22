const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'qwert',
    host: 'localhost',
    port: 5432,
    database: 'Flowers_web'
});
      
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });




exports.get_flower_type = app.get("", async(req, res) => {  
    try {
        const Types = await pool.query(
            `SELECT id, name FROM type`
        )
        res.json(Types["rows"])
  
    } catch (err) {
        res.sendStatus(404);
    }
    
  });
  
  
  exports.create_flower_type = app.post("", async(req, res) => {  
    try {
        const {type} = req.body;
        console.log(type)
        const Types = await pool.query(
            `INSERT INTO type (name) VALUES ('${type}');`
        )
        res.sendStatus(201)
    } catch (err) {
        res.sendStatus(400);
    }
    
  });