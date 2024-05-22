const express = require("express");
const path = require('path');
const userRouter = require("./routers/userRouter.js");
const bunchRouter = require("./routers/bunchRouter.js")
const flowerRouter = require("./routers/flowerRouter.js")
const typeRouter = require('./routers/typesRouter.js');
const shcartRouter = require("./routers/shopingCartRouter.js");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use("/api", bunchRouter);
app.use("/api", userRouter);
app.use("/api", flowerRouter);
app.use("/api", typeRouter);
app.use("/api", shcartRouter);
app.use('/images/flowers', express.static(path.join(__dirname, 'images/flowers')));
app.use('/images/bunches', express.static(path.join(__dirname, 'images/bunches')));


   
(async () => {
     try {
        app.listen(1337);
        console.log("Сервер ожидает подключения...");
    }catch(err) {
        return console.log(err);
    } 
})();

process.on("SIGINT", async() => {
       
    console.log("Приложение завершило работу");
    process.exit();
});
