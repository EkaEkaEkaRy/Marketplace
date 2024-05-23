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


exports.get_one_bunch = app.get("", async(req, res) => {  
    try {
        const id = req.query.bunch;
          const result = await pool.query(`SELECT bunch.id, bunch.name, bunch.image, SUM(bunch_composition.count * warehouse.cost) AS cost, bunch.description, MIN(ROUND(warehouse.count/bunch_composition.count)) AS count
                FROM bunch_composition, warehouse, bunch 
                WHERE bunch.id = bunch_composition.bunch AND bunch_composition.flower = warehouse.id AND bunch.id = ${id}
                GROUP BY bunch.id, bunch.name, bunch.image, warehouse.seller`);

          const findBunchs = await Promise.all(result.rows.map(async (element) => {
                const findFlowers = await pool.query(`SELECT type.name AS name, bunch_composition.count AS quantity 
                              FROM bunch, bunch_composition, warehouse, type 
                              WHERE bunch.id = bunch_composition.bunch AND bunch_composition.flower = warehouse.id AND warehouse.type = type.id
                              AND bunch.id = ${element.id}`);
              
                return {
                  ...element,
                  flowers: JSON.stringify(findFlowers.rows)
                };
              }));
              res.json(findBunchs)
            res.status(200)
              
        } catch (err) {
        res.sendStatus(400);
    }
    
  });