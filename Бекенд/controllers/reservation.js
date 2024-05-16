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

//    localhost:1337/api/reservation
exports.add_reserv = app.post("", async(req, res) => {  
    try {
        const {restaurant, user, type, count, date, time, hours, comment } = req.body;
        if (type == 'стол') {
            const findReservs = await pool.query(
                `SELECT rooms.id FROM restaurants INNER JOIN rooms ON rooms.restaurant = restaurants.id 
                INNER JOIN "tables" ON "tables".room = rooms.id WHERE restaurants.id = ${restaurant} AND
                "tables".id not in (SELECT reservation.room FROM reservation, type WHERE type.id = type AND type.name = 'стол' AND reservation_date = '${date}'  
                AND EXTRACT(EPOCH FROM '${time}'::time) < EXTRACT(EPOCH FROM reservation_time) + hours*3600 AND 
                EXTRACT(EPOCH FROM '${time}'::time) + ${hours}*3600 > EXTRACT(EPOCH FROM reservation_time))
                AND ${count} <= "tables".count GROUP BY rooms.id ORDER BY rooms.status ASC, SUM("tables".count) ASC LIMIT 1;`
            )
            const room = null
            const table = findReservs["rows"]["id"]
        } else {
            const findReservs = await pool.query(
                `SELECT rooms.id FROM restaurants INNER JOIN rooms ON rooms.restaurant = restaurants.id 
                INNER JOIN "tables" ON "tables".room = rooms.id WHERE rooms.status = true AND restaurants.id = ${restaurant} AND
                rooms.id not in (SELECT reservation.room FROM reservation, type WHERE type.id = type AND type.name = 'зал' AND reservation_date = '${date}'  
                AND EXTRACT(EPOCH FROM '${time}'::time) < EXTRACT(EPOCH FROM reservation_time) + hours*3600 AND 
                EXTRACT(EPOCH FROM '${time}'::time) + ${hours}*3600 > EXTRACT(EPOCH FROM reservation_time)) 
                GROUP BY rooms.id HAVING '${count}' <= SUM("tables".count) ORDER BY SUM("tables".count) LIMIT 1;`
            )
            const table = null
            const room = findReservs["rows"]["id"]
        }
        
        const newReserv = await pool.query(
            `INSERT INTO reservation ("user", type, "table", room, count, reservation_date, hours, comment) VALUES (${user}, ${type}, ${table}, ${room}, ${count},'${date}','${time}',${hours},'${comment}') RETURNING id;`
        )
        res.json(newReserv["rows"])

    } catch (err) {
        res.sendStatus(400);
    }
    
});

exports.find_reserv = app.get("", async(req, res) => {  
    try {
        const id = req.query.id;

        const Reserv = await pool.query(
            `SELECT type, count, reservation_date, reservation_time, hours FROM reservation WHERE id = ${id}`
        )
        res.json(Reserv["rows"])

    } catch (err) {
        res.sendStatus(400);
    }
    
});


exports.find_max_count_table = app.get("/table", async(req, res) => {
    const id = req.query.id;
    try {
        const findMax = await pool.query(
                `SELECT MAX("tables".count) FROM restaurants INNER JOIN rooms 
                ON restaurants.id = rooms.restaurant INNER JOIN "tables" ON
                rooms.id = "tables".room WHERE restaurants.id = ${id}`
        )
        
        res.json(findMax["rows"])

    } catch (err) {
        res.sendStatus(400);
    }
});

exports.find_max_count_room = app.get("/room", async(req, res) => {
    const id = req.query.id;
    try {
        const findMax = await pool.query(
                `SELECT MAX(count) FROM
                (SELECT SUM("tables".count) as count FROM restaurants INNER JOIN rooms 
                ON restaurants.id = rooms.restaurant INNER JOIN "tables" ON
                rooms.id = "tables".room WHERE restaurants.id = ${id} AND rooms.status = true GROUP BY "tables".room)`
            )
        res.json(findMax["rows"])

    } catch (err) {
        res.sendStatus(400);
    }
});