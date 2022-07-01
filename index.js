import express from "express";
import mongoose from "mongoose";
import router from "./back/router.js";
import fileUpload from "express-fileupload"
import Controller from "./back/controller.js"

let app = express();
const PORT = 5000;
const URI = 'mongodb+srv://Georges:georges20232@pocbase.4aoq2rb.mongodb.net/?retryWrites=true&w=majority'

app.use(express.json());

//подключаем ejs
app.set('view engine', 'ejs'); 

//меняем директорию с ejs-файлами
app.set('views', "./pages");

app.use('/api',router);

// работа с файлами
app.use(fileUpload({}));

// для чтения http запросов
// не работает?
app.use(express.urlencoded({
    extended : true
}))

//подключение статики. без нее не работает CSS - статическая страница.
app.use('/api', express.static('./static'));


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