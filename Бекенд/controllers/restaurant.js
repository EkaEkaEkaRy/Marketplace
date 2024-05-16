const Pool = require('pg').Pool
const express = require("express");

const pool = new Pool({
    user: 'postgres',
    password: 'qwert',
    host: 'localhost',
    port: 5432,
    database: 'hackathon'
});

      
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

   
exports.find_ad = app.get("", async(req, res) => {  
    try {
        const findRestaurant = await pool.query(
            `SELECT name, address, cuisine, bill, image FROM restaurants;`
        )
        res.json(findRestaurant["rows"])
    } catch (err) {
        res.sendStatus(400);
    }
    
});

exports.filter_find_ad = app.post("", async(req, res) => {
    try {
        const {type, cuisine, bill } = req.body;
        console.log(type, cuisine, bill)
        let query = `SELECT DISTINCT name, address, cuisine, bill, image 
        FROM restaurants, rooms WHERE restaurants.id = rooms.restaurant`;
        if (type.length == 1 && type[0] == 'зал') query += ` AND rooms.status = true`;
        if (cuisine.length != 0){
            query += ` AND (`
            for (let i = 0; i < cuisine.length; i++) {
                if (i != 0) query += ` OR `
                query += `cuisine LIKE '%${cuisine[i]}%'`
            }
            query += `)`
        }
        if (bill.length != 0){
            query += ` AND (`
            for (let i = 0; i < bill.length; i++) {
                if (i != 0) query += ` OR `
                switch (bill[i]) {
                    case "до 1000":
                        query += `bill < 1000`
                        break;
                    case "1000 - 2000":
                        query += `bill BETWEEN 1000 AND 2000`
                        break;
                    case "2000 - 3000":
                        query += `bill BETWEEN 2000 AND 3000`
                        break;
                    case "от 3000":
                        query += `bill > 3000`
                        break;
                    default:
                        break;
                }
            }
            query += `)`
        }
        const findRestaurant = await pool.query(query)
        res.json(findRestaurant["rows"])
        } catch (err) {
        res.sendStatus(400);
    }
})
