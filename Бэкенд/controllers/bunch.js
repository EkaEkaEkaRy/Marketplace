const Pool = require('pg').Pool
const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require("fs")

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
      cb(null, 'images/bunches/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileName = `${uniqueSuffix}-${file.originalname}`;
      cb(null, fileName);
    },
  });
  const upload = multer({ storage });


  exports.get_bunchs = app.get("", async(req, res) => {  
    try {
        const id = req.query.user;
        const name = req.query.name;
        const orderby = req.query.orderby
        let findBunchs;
        if (!id) {
            if (name == 'null' && orderby == 'null'){
              const result = await pool.query(`SELECT bunch.id, bunch.name, bunch.image, SUM(bunch_composition.count * warehouse.cost) AS cost 
              FROM bunch_composition, warehouse, bunch 
              WHERE bunch.id = bunch_composition.bunch AND bunch_composition.flower = warehouse.id GROUP BY bunch.id, bunch.name, bunch.image`)
              findBunchs = result['rows']
            } else if (!name) {
              const type_flowers = req.query.type;
              const count_bunch = req.query.count;
              const min_cost = req.query.min_cost;
              const max_cost = req.query.max_cost;
              let query = `SELECT bunch.id, bunch.name, bunch.image, SUM(bunch_composition.count * warehouse.cost) AS cost 
              FROM bunch_composition, warehouse, bunch 
              WHERE bunch.id = bunch_composition.bunch AND bunch_composition.flower = warehouse.id `;
              
              if (type_flowers) {
                const mass_of_types = type_flowers.split("-");
                query += `AND bunch.id IN (SELECT DISTINCT bunch.id FROM bunch_composition, warehouse, bunch, type 
                  WHERE bunch.id = bunch_composition.bunch AND bunch_composition.flower = warehouse.id AND type.id = warehouse.type AND
                  (`;
                for (const element of mass_of_types) {
                  query += `type.name ~* '${element}' OR `;
                }
                query = query.slice(0, -4);
                query += ')) ';
              }
              
              if (name) query += `AND bunch.name ~* '${name}' `;
  
              query += `GROUP BY bunch.id, bunch.name, bunch.image `;
  
              if (count_bunch || max_cost || min_cost) {
                query += `HAVING `;
                
                if (count_bunch) query += `SUM(bunch_composition.count) = ${count_bunch} `
                if (min_cost) {
                  if (count_bunch) query += `AND `;
                  query += `SUM(bunch_composition.count * warehouse.cost) >= ${min_cost} `
                }
                if (max_cost) {
                  if (count_bunch || min_cost) query += `AND `;
                  query += `SUM(bunch_composition.count * warehouse.cost) <= ${max_cost} `
                }
              }
              if (orderby != 'null') 
                {
                  query += `ORDER BY SUM(bunch_composition.count * warehouse.cost) ${orderby}`
                }
  
              const result = await pool.query(query)
              findBunchs = result['rows']
            } else {
              const result = await pool.query(`SELECT bunch.id, bunch.name, bunch.image, SUM(bunch_composition.count * warehouse.cost) AS cost 
              FROM bunch_composition, warehouse, bunch 
              WHERE bunch.id = bunch_composition.bunch AND bunch_composition.flower = warehouse.id GROUP BY bunch.id, bunch.name, bunch.image
              ORDER BY SUM(bunch_composition.count * warehouse.cost) ${orderby}`)
              findBunchs = result['rows']
            }
            
        } else {
            const result = await pool.query(`SELECT bunch.id, bunch.name, bunch.image, SUM(bunch_composition.count * warehouse.cost) AS cost, description 
                FROM bunch_composition, warehouse, bunch 
                WHERE bunch.id = bunch_composition.bunch AND bunch_composition.flower = warehouse.id
                GROUP BY bunch.id, bunch.name, bunch.image, warehouse.seller
				HAVING warehouse.seller = ${id}`);

            findBunchs = await Promise.all(result.rows.map(async (element) => {
                const findFlowers = await pool.query(`SELECT type.name AS name, bunch_composition.count AS quantity 
                              FROM bunch, bunch_composition, warehouse, type 
                              WHERE bunch.id = bunch_composition.bunch AND bunch_composition.flower = warehouse.id AND warehouse.type = type.id
                              AND bunch.id = ${element.id}`);
              
                return {
                  ...element,
                  flowers: JSON.stringify(findFlowers.rows)
                };
              }));
              
        }

        res.json(findBunchs)
        res.status(200)
    } catch (err) {
        res.sendStatus(400);
    }
    
  });


  exports.create_bunch = app.post('', upload.single('image'), async (req, res) => {
    try {
      // Получаем URL и название загруженной картинки
      const imageUrl = `http://localhost:1337/images/bunches/${req.file.filename}`;
      const name = req.body.name;
      const flowers = JSON.parse(req.body.flowers)
      const description = req.body.description

      const id_bunch = await pool.query(`INSERT INTO bunch (name, image, description) 
      VALUES ('${name}', '${imageUrl}', '${description}') RETURNING id;`);
      flowers.forEach(async element => {
        await pool.query(`INSERT INTO bunch_composition (bunch, flower, count) VALUES (${id_bunch["rows"][0]['id']}, (SELECT warehouse.id FROM warehouse, type 
            WHERE warehouse.type = type.id AND type.name = '${element.name}' LIMIT 1), ${element.quantity});`)
      });
  
      res.status(200).json({ message: 'Картинка успешно загружена' });
    } catch (error) {
      console.error('Ошибка при загрузке картинки:', error);
      res.status(500).json({ message: 'Ошибка при загрузке картинки' });
    }
  });



  exports.update_bunch = app.put('', upload.single('image'), async (req, res) => {
    try {
      // Получаем URL и название загруженной картинки
      const id = req.body.id;
      const name = req.body.name;
      const flowers = JSON.parse(req.body.flowers);
      const description = req.body.description
  
      if (!req.file){
        await pool.query(`UPDATE bunch SET name = '${name}', description='${description}' WHERE id = ${id};`);

      } else {
        const imageUrl = `http://localhost:1337/images/flowers/${req.file.filename}`;
        await pool.query(`UPDATE bunch SET name = '${name}', image = '${imageUrl}', description ='${description}' WHERE id = ${id};`);
      }
      /*
      let string_flowers = ""
      flowers.forEach(async element => {
            const id_flower_from_new_bunch = await pool.query(`SELECT warehouse.id FROM type, warehouse WHERE warehouse.type = type.id AND type.name = '${element.name}' LIMIT 1`)
          string_flowers += id_flower_from_new_bunch.id + ', '
      });
      string_flowers += "0"
      */
      let string_flowers = '';
      console.log(flowers)
        for (const element of flowers) {
        const result = await pool.query(`SELECT warehouse.id FROM type, warehouse WHERE warehouse.type = type.id AND type.name = '${element.name}' LIMIT 1`);
        if (result['rows']) {
            string_flowers += result['rows'][0]['id'] + ', ';
        }
        }

        // Удаляем последнюю запятую
        string_flowers = string_flowers.slice(0, -2);

      const not_in_new_bunch = await pool.query(`SELECT id FROM bunch_composition WHERE bunch = ${id} AND flower NOT IN (${string_flowers})`);
      for (const element of not_in_new_bunch['rows']) {
        console.log(element, element.id)
          await pool.query(`DELETE FROM bunch_composition WHERE id = ${element.id}`);
      };
      for (const element of flowers){
        const result = await pool.query(`UPDATE bunch_composition SET count=${element.quantity} 
          WHERE flower= (SELECT warehouse.id FROM type, warehouse WHERE warehouse.type = type.id AND type.name = '${element.name}' LIMIT 1) AND bunch = ${id};`)
        const check_flower = await pool.query(`SELECT type.name FROM warehouse, type, bunch, bunch_composition 
        WHERE bunch.id = bunch_composition.bunch AND bunch_composition.flower = warehouse.id 
        AND warehouse.type = type.id AND bunch.id = ${id} AND type.name = '${element.name}'`)
        if(check_flower['rows'].length == 0) await pool.query(`INSERT INTO bunch_composition (bunch, flower, count) VALUES (${id}, (SELECT warehouse.id FROM type, warehouse 
            WHERE warehouse.type = type.id AND type.name = '${element.name}' LIMIT 1), ${element.quantity})`)
      }
        
      res.status(200).json({ message: 'Картинка успешно загружена' });
    } catch (error) {
      console.error('Ошибка при загрузке картинки:', error);
      res.status(500).json({ message: 'Ошибка при загрузке картинки' });
    }
  });
  
  
  
  exports.delete_bunch = app.delete('', async (req, res) => {
    try {
      const id = req.query.id;
      const image_path = await pool.query(`SELECT image FROM bunch WHERE id=${id}`)
      
      const rootDir = path.dirname(__dirname);
      const fullPath = path.join(rootDir, 'images/bunches', image_path["rows"][0]["image"].slice(37));

      await fs.promises.unlink(path.join(fullPath));
      await pool.query(`DELETE FROM bunch_composition WHERE bunch = ${id}; DELETE FROM bunch WHERE id = ${id};`);
      res.status(200).json({ message: '' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '' });
    }
  });