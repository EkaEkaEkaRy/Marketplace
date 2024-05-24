const Pool = require('pg').Pool
const express = require("express");

const moment = require('moment-timezone');

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

  function coalesce(value, defaultValue) {
    return value !== undefined && value !== null && value === "" ? value : defaultValue;
  }

  exports.create_order = app.post('', async (req, res) => {
    try {
        const user_id = req.body.id;
        const address = req.body.address;
        const date = req.body.date;
        const time = req.body.time;
        const comment = req.body.comment;
        const date_order = moment().tz(moment.tz.guess()).format('YYYY-MM-DD');
        console.log(user_id)
        console.log(date_order)
        console.log(date)
        console.log(time)
        console.log(address)
        const bunchs_from_cart = await pool.query(`SELECT bunch, count FROM shopping_cart WHERE customer=${user_id}`);
        if(bunchs_from_cart['rows'].length !== 0){
            const order_body = await pool.query(`INSERT INTO "order" (customer, address, date_order, date_deliver, time_deliver, status) VALUES
            (${user_id}, '${address}', '${date_order}', '${date}', '${time}', 1) returning id`);

            await pool.query(`INSERT INTO comment ("order", text) VALUES (${order_body['rows'][0]['id']}, '${coalesce(comment, "нет")}')`);

            console.log(bunchs_from_cart['rows'])
            for (const element of bunchs_from_cart['rows']) {
                console.log(element)
                await pool.query(`INSERT INTO order_items ("order", bunch, count) VALUES
                (${order_body['rows'][0]['id']}, ${element.bunch}, ${element.count})`)
            }

            await pool.query(`DELETE FROM shopping_cart WHERE customer=${user_id}`)
        }
        res.status(201).json({ message: 'Заказ создан' });

    } catch (error) {
        console.error('Ошибка', error);
        res.status(500).json({ message: 'Ошибка при заказе букетов' });
    }
  })