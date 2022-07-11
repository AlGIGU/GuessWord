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

    profile(req, res){
        mainObject.updateStatus({
            headTitle : mainObject.userInfo.name,
            currentLink : "/profile",
            cssList : ["./front/profile.css"],
            scriptsList : [
                "./scripts/profile.js",
                "./scripts/profileValid.js",
            ]
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

    notFound(req,res){
        mainObject.updateStatus({
            headTitle:"Guess Word",
            currentLink:"notFound",
            cssList: ['./front/notFound.css'],
        });

        res.render('notFound', mainObject.getStatus);
    };

    async checkPass(req,res){
        try{
            const userDB = await User.findById(mainObject.userInfo.id)  
        
            if (!userDB){
                throw new Error('Пользователь не найден');
            };

            if (bcrypt.compareSync(req.body.pass, userDB.password)){
                res.json('Пароль совпадает')
            } else {
                res.status(400).json('Не правильный пароль');
            }
        } catch(e){
            res.status(500).json(e.message);
        }
    }

    // работа с БД
    async updateUser(req,res){
        try{
            let updateBody = {
                name: req.body.name,
                mail:req.body.mail,
            };

            if (req.body.newPassword){
                updateBody.password = bcrypt.hashSync(req.body.newPassword, 8);
            } 

            // updateBody.privilege = mainObject.getUser.privilege,
            // updateBody.coins = mainObject.getStatus.coins

            const userDB = await User.findByIdAndUpdate(mainObject.userInfo.id,updateBody, {new:true});
            
            if (!userDB){
                throw new Error('Пользователь не найден')
            }
            
            mainObject.updateUser(req.body);

            res.json('Done');
        }catch(e){
            res.status(500).json(e.message);
        }
    }

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
                throw new Error("Ошибка валидации");
            }

            if (await CurrentUser.userInDB(req.body.name,req.body.mail)){
                throw new Error('Данный пользователь уже зарегистрирован.')
            };

            // хэширование пароля
            let newUser = req.body;
            newUser.password = bcrypt.hashSync(newUser.password, 8);
            
            // создание экземпляра по схеме
            const createdUser  = new User(newUser);

            createdUser.save(err=>{
                if (err){
                    throw new Error('Ошибка сохранения в БД.');
                }
            });
            mainObject.updateUser({
                logined : true,
                name : req.body.name,
                coins : 0,
                mail : req.body.mail,
                status: req.body.privilege ?? "User",
            });

            res.json('Done');       

        } catch(e){
            res.status(500).json(e);
        };
    };

    async deleteUser(req,res){
        try{
            await User.findByIdAndDelete(mainObject.userInfo.id);
            mainObject.unsetUser();

            res.json("Done");
        }catch(e){
            res.status(500).json(e.message);
        }
    }
};

export default new Controller();