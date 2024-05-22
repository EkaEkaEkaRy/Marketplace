const Pool = require('pg').Pool
const express = require("express");
const multer = require('multer');
const path = require('path');

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

exports.add_into_cart = app.post('', async (req, res) => {
    try {
        const user = req.body.user;
        const bunch = req.body.bunch;
        console.log(user, bunch)
        const result = await pool.query(`SELECT id FROM shopping_cart WHERE customer=${user} AND bunch=${bunch}`)
        if(result['rows'].length == 0) await pool.query(`INSERT INTO shopping_cart (customer, bunch, count) VALUES (${user}, ${bunch}, 1)`)
    } catch (error) {
        console.error('Ошибка при загрузке картинки:', error);
        res.status(500).json({ message: 'Ошибка при загрузке картинки' });
    }
})


exports.get_cart = app.get('', async (req, res) => {
    try {
        const user = req.query.user;
        const shoppingCart = await pool.query(`SELECT shopping_cart.id, bunch.name, bunch.image, shopping_cart.count, SUM(bunch_composition.count * warehouse.cost) AS cost
        FROM bunch_composition, warehouse, bunch, shopping_cart 
        WHERE bunch.id = bunch_composition.bunch AND bunch_composition.flower = warehouse.id AND shopping_cart.bunch = bunch.id AND shopping_cart.customer = ${user}
        GROUP BY shopping_cart.id, bunch.name, bunch.image, shopping_cart.count`)
        res.json(shoppingCart['rows'])
    } catch (error) {
        console.error('Ошибка при загрузке картинки:', error);
        res.status(500).json({ message: 'Ошибка при загрузке картинки' });
    }
})


exports.delete_bunch = app.delete('', async (req, res) => {
    try {
      const id = req.query.id;
      await pool.query(`DELETE FROM shopping_cart WHERE id = ${id};`);
      res.status(200).json({ message: '' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '' });
    }
  });

  exports.edit_cart = app.put('', async (req, res) => {
    try {
      const id = req.body.id;
      const count = req.body.count
      await pool.query(`UPDATE shopping_cart SET count=${count} WHERE id=${id}`);
      res.status(200).json({ message: '' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '' });
    }
  });