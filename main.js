import express from "express";
import mongoose from "mongoose";
import router from "./back/router.js";

import delRouter from "./back/routerDel.js";
import putRouter from "./back/routerPut.js";
import postRouter from "./back/routerPost.js";

import fileUpload from "express-fileupload";
import Controller from "./back/controller.js";

let app = express();
const PORT = process.env.PORT || 5000;
const URI = 'mongodb+srv://Georges:georges20232@pocbase.4aoq2rb.mongodb.net/?retryWrites=true&w=majority'

app.use(express.json());

//подключаем ejs
app.set('view engine', 'ejs'); 

//меняем директорию с ejs-файлами
app.set('views', "./pages");

app.use('/', router);
app.use('/', delRouter);
app.use('/', putRouter);
app.use('/', postRouter);

// работа с файлами
app.use(fileUpload({}));

//подключение статики. без нее не работает CSS - статическая страница.
app.use('/', express.static('./static'));

// для чтения http запросов
// не работает?
app.use(express.urlencoded({
    extended : true
}))


// 404 not found
app.use(function(req, res, next) {
    res.status(404);
  
    // respond with html page
    if (req.accepts('html')) {
        Controller.notFound(req,res);
    }
  
    // respond with json
    // if (req.accepts('json')) {
    //   res.json({ error: 'Not found' });
    //   return;
    // }
  
    // default to plain-text. send()
    // res.type('txt').send('Not found');
  });

async function startApp(){
    await mongoose.connect(URI);

    app.listen(PORT,()=>{
        console.log('Server has been started');
    })
}

startApp();