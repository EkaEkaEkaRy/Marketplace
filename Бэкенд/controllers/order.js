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
    return value !== undefined && value !== null && value !== "" ? value : defaultValue;
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

            const sellers = await pool.query(`SELECT warehouse.seller FROM shopping_cart, bunch, bunch_composition, warehouse
            WHERE shopping_cart.bunch = bunch.id AND bunch.id = bunch_composition.bunch AND bunch_composition.flower = warehouse.id
            AND shopping_cart.customer = ${user_id} GROUP BY warehouse.seller`)

            for (i of sellers.rows) {
                const order_body = await pool.query(`INSERT INTO "order" (customer, address, date_order, date_deliver, time_deliver, status) VALUES
            (${user_id}, '${address}', '${date_order}', '${date}', '${time}', 1) returning id`);

            await pool.query(`INSERT INTO comment ("order", text) VALUES (${order_body['rows'][0]['id']}, '${coalesce(comment, "нет")}')`);

            console.log(bunchs_from_cart['rows'])
            for (const element of bunchs_from_cart['rows']) {
                const isBunch = await pool.query(`SELECT * FROM bunch, bunch_composition, warehouse
                WHERE bunch.id = bunch_composition.bunch AND bunch_composition.flower = warehouse.id
                AND warehouse.seller = ${i.seller} AND bunch.id = ${element.bunch}`)

                if(isBunch["rows"].length != 0){
                    await pool.query(`INSERT INTO order_items ("order", bunch, count) VALUES
                    (${order_body['rows'][0]['id']}, ${element.bunch}, ${element.count})`)

                }
                
            }
                
            }
            await pool.query(`DELETE FROM shopping_cart WHERE customer=${user_id}`)

        }
        res.status(201).json({ message: 'Заказ создан' });

    } catch (error) {
        console.error('Ошибка', error);
        res.status(500).json({ message: 'Ошибка при заказе букетов' });
    }
  })



  exports.get_orders = app.get('', async (req, res) => {
    try {
        const user_id = req.query.user;
        const status = req.query.status;

        let user_role = await pool.query(`SELECT roles.role FROM roles, users WHERE roles.id = users.role AND users.id = ${user_id}`)
        if (user_role.rows[0].role === 'покупатель') {
            
            let query = `SELECT "order".id AS order_id, address, date_order, date_deliver, time_deliver, comment.text AS comment, status.name AS status, warehouse.seller
        FROM "order", comment, status, order_items, bunch, bunch_composition, warehouse
        WHERE comment."order" = "order".id AND "order".status = status.id AND order_items."order" = "order".id AND
        order_items.bunch = bunch.id AND bunch.id = bunch_composition.bunch AND warehouse.id = bunch_composition.flower 
        AND "order".customer = ${user_id}
        GROUP BY "order".id, address, date_deliver, time_deliver, comment.text, status.name, warehouse.seller, status.id `
        
        if (status !== 'null' && status !== null) query += `HAVING status.name='${status}' `

        query += `ORDER BY status.id, date_deliver DESC, time_deliver DESC `
        
        const result = await pool.query(query)

        const orders = await Promise.all(result.rows.map(async (element) => {
            const findBunches = await pool.query(`SELECT bunch.id, bunch.name, order_items.count, bunch.image, SUM(bunch_composition.count * warehouse.cost) AS cost
            FROM order_items, bunch, bunch_composition, warehouse 
            WHERE order_items.bunch = bunch.id AND bunch.id = bunch_composition.bunch AND warehouse.id = bunch_composition.flower AND warehouse.seller = ${element.seller} AND order_items."order" = ${element.order_id}
            GROUP BY bunch.id, bunch.name, order_items.count, bunch.image`);
          
            return {
              ...element,
              bunches: JSON.stringify(findBunches.rows)
            };
          }));
          
          res.status(200).json(orders)

        } else {

            let query = `SELECT "order".id AS order_id, address, date_order, date_deliver, time_deliver, comment.text AS comment, status.name AS status, warehouse.seller
        FROM "order", comment, status, order_items, bunch, bunch_composition, warehouse
        WHERE comment."order" = "order".id AND "order".status = status.id AND order_items."order" = "order".id AND
        order_items.bunch = bunch.id AND bunch.id = bunch_composition.bunch AND warehouse.id = bunch_composition.flower 
        AND warehouse.seller = ${user_id}
        GROUP BY "order".id, address, date_deliver, time_deliver, comment.text, status.name, warehouse.seller, status.id `
        
        if (status !== 'null' && status !== null) query += `HAVING status.name='${status}' `

        query += `ORDER BY status.id, date_deliver DESC, time_deliver DESC `
        
        const result = await pool.query(query)

        const orders = await Promise.all(result.rows.map(async (element) => {
            const findBunches = await pool.query(`SELECT bunch.id, bunch.name, order_items.count, bunch.image, SUM(bunch_composition.count * warehouse.cost) AS cost
            FROM order_items, bunch, bunch_composition, warehouse 
            WHERE order_items.bunch = bunch.id AND bunch.id = bunch_composition.bunch AND warehouse.id = bunch_composition.flower AND warehouse.seller = ${element.seller} AND order_items."order" = ${element.order_id}
            GROUP BY bunch.id, bunch.name, order_items.count, bunch.image`);
          
            return {
              ...element,
              bunches: JSON.stringify(findBunches.rows)
            };
          }));
          
          res.status(200).json(orders)

        }

        

    } catch (error) {
        console.error('Ошибка', error);
        res.status(500).json({ message: 'Ошибка при заказе букетов' });
    }
  })


  exports.update_status = app.put('', async (req, res) => {
    try {
        const id = req.body.id;
        const status = req.body.status;
        console.log(id, status)

        await pool.query(`UPDATE "order" SET status=(SELECT id FROM status WHERE name='${status}' LIMIT 1) WHERE id=${id}`)

        res.status(200).json({ message: 'Статус изменен' });
    } catch (error) {
        console.error('Ошибка', error);
        res.status(500).json({ message: 'Ошибка при изменении статуса' });
    }
  })