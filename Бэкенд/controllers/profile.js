const Pool = require('pg').Pool
const express = require("express");
const multer = require('multer');
const path = require('path');
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

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images/users/');
    },
    filename: (req, file, cb) => {
      // Генерируем уникальное имя файла, если название совпадает с существующим
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileName = `${uniqueSuffix}-${file.originalname}`;
      cb(null, fileName);
    },
  });
  const upload = multer({ storage });


  exports.info_user = app.get("", async(req, res) => {  
    try {
        const id = req.query.user;
        const findUser = await pool.query(
            `SELECT id, name, mail, phone, image FROM users WHERE id = ${id};`
        )
        if(findUser['rows'].length == 0) res.sendStatus(400);
        else res.status(200).json(findUser["rows"])
    } catch (err) {
        res.sendStatus(400);
    }
    
});

exports.update_profile = app.put('', upload.single('image'), async (req, res) => {
    try {
      // Получаем URL и название загруженной картинки
      const id = req.body.id;
      const name = req.body.name;
      const login = req.body.login;
      const phone = req.body.phone;
      const password = req.body.password;
      
      const check_login = await pool.query(`Select * FROM users WHERE mail = '${login}' AND NOT id = ${id}`)
      if (check_login.rows.length !== 0) res.status(400).json({ message: 'Профиль уже существует' });
      else {
        if (!req.file){
          await pool.query(`UPDATE users SET name='${name}', mail='${login}', phone='${phone}', password='${password}' WHERE id=${id}`);
        } else {
          const image_path = await pool.query(`SELECT image FROM users WHERE id=${id}`)
          if (image_path["rows"][0]["image"] != null) {
            const rootDir = path.dirname(__dirname);
            const fullPath = path.join(rootDir, 'images/users', image_path["rows"][0]["image"].slice(35));
  
            await fs.promises.unlink(path.join(fullPath));
          }
  
          const imageUrl = `http://localhost:1337/images/users/${req.file.filename}`;
          await pool.query(`UPDATE users SET name='${name}', mail='${login}', phone='${phone}', 
          password='${password}', image='${imageUrl}' WHERE id=${id}`);
        }
          
          
        res.status(200).json({ message: 'Профиль успешно обновлен' });

      }
      
    } catch (error) {
      console.error('Ошибка при загрузке картинки:', error);
      res.status(500).json({ message: 'Ошибка при обновлении профиля' });
    }
  });