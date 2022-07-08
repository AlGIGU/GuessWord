import UserModel from "./User.js";
import {validationResult} from "express-validator";
import CurrentUser from "./currentUser.js";
import User from "./User.js";

function mainObject(obj){
    let res = {
        headTitle : "Guess Word",
        cssList : ["./front/header.css"],
        logined : false,
        profileName : undefined,
        currentLink : undefined,
        scripstList : []
    };

    for (let i of Object.keys(obj)){
        if (i == "cssList"){
            res[i] = res[i].concat(obj[i]);
            continue;
        }
        res[i] = obj[i];
    };

    return res;
};


class Controller{
    index(req, res){
        res.render('index',
        mainObject({
            currentLink : "/"
        })    
        );       
    };

    login(req, res){
        res.render('login', mainObject({
            headTitle:"Login",

            // скрипты и css - обрабатываются как статика
            cssList: ['./front/login.css'],
            scriptsList : [
                './scripts/login.js',
                './scripts/loginValid.js',
            ],
        }));        
    };
    
    reg(req, res){
        res.render('reg', mainObject({
            headTitle:"Sign Up",
            cssList: ['./front/reg.css'],
            scriptsList : [
                './scripts/reg.js',
                './scripts/regValid.js'
            ]
        }) 

        );        
    };
    
    //В названии странице сделать имя пользователя
    profile(req, res){
        res.render('profile', mainObject({
            headTitle : "Profile"
        })
        );        
    };
    
    game(req, res){
        res.render('game', mainObject({
            headTitle : "Guess Word"
        })
        )        
    };
   
    rules(req, res){
        res.render('rules', mainObject({
            headTitle:"Guess Word",
            cssList:['./front/rules.css'],
            currentLink:"/rules"
        })
        );
    };

    // перенести
    async getUser(req,res){
        try{
            if (Object.keys(req.body).length == 0) throw new Error('Empty request!');

            // валидация
            const errors = validationResult(req);
            if (!errors.isEmpty()) throw new Error('Не правильный формат ввода');
          
            const dadata = await CurrentUser.findUser(req.body.login, req.body.pass);


            res.json('All correct!');
        } catch(e){
            res.status(500).json(e);
        }
    };

    async postUser(req,res){
        try{
            if (Object.keys(req.body).length == 0) throw new Error('Suck');
            
            // валидация
            const errors = validationResult(req);
            if (!errors.isEmpty()) throw new Error("Ошибка валидация");

            if (await CurrentUser.userInDB(req.body.name,req.body.mail)){
                throw new Error('Данный пользователь уже зарегистрирован.')
            };

            const createrUser = await User.create(req.body);
            res.json(createrUser);       

        } catch(e){
            res.status(500).json(e);
        };
    };

    notFound(req,res){
        res.render('notFound', mainObject({
            headTitle:"404 not found",
            currentLink:'/notFound',
            cssList:['./front/notFound.css']
        }))
    }

};

export default new Controller();