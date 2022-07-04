import {Router} from "express";
import Controller from "./controller.js";
import {check} from "express-validator";

let router = new Router();

router.get('/', Controller.index);
router.get('/game', Controller.game);

router.get('/login', Controller.login);
router.get('/reg', Controller.reg);

router.get('/profile', Controller.profile);
router.get('/rules', Controller.rules);

router.post('/login', [
    check("login", "Поле логин должно быть длиной от 2 до 10 символов").notEmpty().isLength({
        min:2,
        max:10
    }),
    check('pass', "Пароль должен быть длиной от 6 до 10 символов").notEmpty().isLength({
        min:6,
        max:10
    })
], Controller.getUser);

router.post('/reg',[
    check('name', "Поле имя не должно быть пустым").notEmpty(),
    check("pass", "Пароль должен быть длиной от 6 до 10 символов").notEmpty().isLength({
        min:6,
        max:10
    }),
    check("mail", "Неправильный формат почты").notEmpty().isEmail(),
], Controller.postUser);




export default router;