const Pool = require('pg').Pool
const express = require("express");

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

//     path: localhost:1337/api/find-user

exports.find_user = app.get("", async(req, res) => {  
    try {
        const mail = req.query.mail;
        const password = req.query.password;
        const findUser = await pool.query(
            `SELECT id, role FROM users WHERE mail = '${mail}' AND password = '${password}';`
        )
        if(findUser['rows'].length == 0) res.sendStatus(400);
        else res.json(findUser["rows"])
    } catch (err) {
        res.sendStatus(400);
    }
    
});

//     path: localhost:1337/api/create-user

exports.create_user = app.post("", async(req, res) => {  
    try {
        const {name, login, phone, password} = req.body;
        const findUser = await pool.query(
            `SELECT id FROM users WHERE mail = '${login}';`
        )
        if (findUser["rows"].length != 0) res.status(400);
        else {const newUser = await pool.query(
            `INSERT INTO users (name, mail, phone, password, role) VALUES ('${name}', '${login}', '${phone}', '${password}', 1) RETURNING id;`
        )
        res.json(newUser["rows"])}
    } catch (err) {
        res.status(400);
    }
    
});
