import mongoose from "mongoose";
import {validationResult} from "express-validator";
import CurrentUser from "./currentUser.js";
import User from "./User.js";
import bcrypt from "bcrypt";

let mainObject = CurrentUser;


class Controller{
    index(req, res){
        mainObject.updateStatus({
            currentLink : "/",
        })
        res.render('index', mainObject.getStatus);       
    };

    login(req, res){
        mainObject.updateStatus({
            headTitle:"Login",
            currentLink : "/login",

            // скрипты и css - обрабатываются как статика
            cssList: ['./front/login.css'],
            scriptsList : [
                './scripts/login.js',
                './scripts/loginValid.js',
            ],
        });
        res.render('login', mainObject.getStatus);        
    };

    reg(req, res){
        mainObject.updateStatus({
            headTitle:"Sign Up",
            currentLink : "/reg",
            cssList: ['./front/reg.css'],
            scriptsList : [
                './scripts/reg.js',
                './scripts/regValid.js'
            ]
        });

        res.render('reg', mainObject.getStatus);        
    };

    //В названии странице сделать имя пользователя
    profile(req, res){
        mainObject.updateStatus({
            headTitle : "Profile",
            currentLink : "/profile",
            cssList : ["./front/profile.css"],
        });

        res.render('profile', mainObject.getStatus);        
    };

    game(req, res){
        mainObject.updateStatus({
            headTitle : "Guess Word",
            currentLink : "/game",
        });

        res.render('game', mainObject.getStatus);
    };


    rules(req, res){
        mainObject.updateStatus({
            headTitle:"Guess Word",
            cssList:['./front/rules.css'],
            currentLink:"/rules"
        });
        res.render('rules', mainObject.getStatus);
    };

    exitUser(req,res){
        mainObject.unsetUser();
        mainObject.updateStatus({
            headTitle:"Guess Word",
            currentLink : "/",
        });

        res.render('index', mainObject.getStatus);
    };

    // перенести
    async getUser(req,res){
        try{
            if (Object.keys(req.body).length == 0) throw new Error('Empty request!');

            // валидация
            const errors = validationResult(req);
            if (!errors.isEmpty()) throw new Error('Не правильный формат ввода');

            const userData = await mainObject.findUser(req.body.login, req.body.pass);
            if (Object.keys(userData).length == 5){
                mainObject.setUser(userData);
            } else {
                throw new Error('Не правильные данные');
            }

            res.json('All correct!');
        } catch(e){
            res.status(500).json(e);
        };
    };

    async postUser(req,res){
        try{
            if (Object.keys(req.body).length == 0) throw new Error('Suck');
            
            // валидация
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                console.log('Ошибка валидации');
                throw new Error("Ошибка валидации");
            }

            if (await CurrentUser.userInDB(req.body.name,req.body.mail)){
                console.log('Данный пользователь уже зарегистрирован.');
                throw new Error('Данный пользователь уже зарегистрирован.')
            };

            // хэширование пароля
            let newUser = req.body;
            newUser.password = bcrypt.hashSync(newUser.password, 8);
            
            // создание экземпляра по схеме
            const createdUser  = new User(newUser);

            createdUser.save(err=>{
                if (err){
                    console.log('Ошибка сохранения в БД.');
                    throw new Error('Ошибка сохранения в БД.');
                }
            });

            mainObject.updateStatus({
                userProfile: {
                    logined : true,
                    name : req.body.name,
                    coins : 0,
                    mail : req.body.mail,
                }
            })

            res.json('Done');       

        } catch(e){
            res.status(500).json(e);
        };
    };

    notFound(req,res){
        mainObject.updateStatus({
            headTitle:"Guess Word",
            currentLink:"notFound",
            cssList: ['./front/notFound.css'],
        });

        res.render('notFound', mainObject.getStatus);
    };

};

export default new Controller();