const express = require('express');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');
const fs = require('fs')

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

  //app.use(express.json({ limit: '50mb' }));
  //app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Настраиваем хранилище для загружаемых картинок
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/flowers/');
  },
  filename: (req, file, cb) => {
    // Генерируем уникальное имя файла, если название совпадает с существующим
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = `${uniqueSuffix}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage });

// Обработчик для загрузки картинки
exports.create_flower = app.post('', upload.single('image'), async (req, res) => {
  try {
    // Получаем URL и название загруженной картинки
    const imageUrl = `http://localhost:1337/images/flowers/${req.file.filename}`;
    const flower = req.body.flower;
    const seller = req.body.seller;
    const count = req.body.count;
    const cost = req.body.cost;


    // Сохраняем картинку в базе данных
    await pool.query(`INSERT INTO warehouse (type, seller, count, cost, image) 
    VALUES ((SELECT id FROM type WHERE type.name = '${flower}' LIMIT 1), ${seller}, ${count}, ${cost}, '${imageUrl}')`);

    res.status(200).json({ message: 'Картинка успешно загружена' });
  } catch (error) {
    console.error('Ошибка при загрузке картинки:', error);
    res.status(500).json({ message: 'Ошибка при загрузке картинки' });
  }
});



exports.get_flowers = app.get("", async(req, res) => {  
  try {
      const id = req.query.id;
      const findFrowers = await pool.query(
          `SELECT warehouse.id, type.name AS name, count, cost, image FROM warehouse, type 
          WHERE seller = ${id} AND type.id = warehouse.type ORDER BY name`
      )
      res.json(findFrowers["rows"])
      res.status(200)
  } catch (err) {
    console.error(err)
      res.sendStatus(400);
  }
  
});


exports.update_flower = app.put('', upload.single('image'), async (req, res) => {
  try {
    // Получаем URL и название загруженной картинки
    const flower = req.body.flower;
    const flower_id = req.body.id_flower;
    const count = req.body.count;
    const cost = req.body.cost;

    if (!req.file){
      await pool.query(`UPDATE warehouse SET type=(SELECT id FROM type 
        WHERE type.name = '${flower}' LIMIT 1), count= ${count}, cost= ${cost} WHERE id=${flower_id}`);
    } else {
      const image_path = await pool.query(`SELECT image FROM warehouse WHERE id=${flower_id}`)

      const rootDir = path.dirname(__dirname);
      const fullPath = path.join(rootDir, 'images/flowers', image_path["rows"][0]["image"].slice(37));
  
      await fs.promises.unlink(path.join(fullPath));
      const imageUrl = `http://localhost:1337/images/flowers/${req.file.filename}`;
      await pool.query(`UPDATE warehouse SET type=(SELECT id FROM type 
        WHERE type.name = '${flower}' LIMIT 1), count= ${count}, cost= ${cost}, image='${imageUrl}' WHERE id=${flower_id}`);
    }
      
      
    res.status(200).json({ message: 'Картинка успешно загружена' });
  } catch (error) {
    console.error('Ошибка при загрузке картинки:', error);
    res.status(500).json({ message: 'Ошибка при загрузке картинки' });
  }
});



exports.delete_flower = app.delete('', async (req, res) => {
  try {
    const id = req.query.flower;
    const image_path = await pool.query(`SELECT image FROM warehouse WHERE id=${id}`)

    const rootDir = path.dirname(__dirname);
    const fullPath = path.join(rootDir, 'images/flowers', image_path["rows"][0]["image"].slice(37));

    await fs.promises.unlink(path.join(fullPath));
    await pool.query(`DELETE FROM warehouse WHERE id = ${id};`);
    res.status(200).json({ message: '' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '' });
  }
});