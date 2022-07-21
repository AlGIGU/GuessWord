import {Router} from "express";
import Controller from "./controller.js";
import {check} from "express-validator";

const passMin = 6;
const passMax = 10;

let router = new Router();

// GET
router.get('/', Controller.index);
router.get('/game', Controller.game);

router.get('/login', Controller.login);
router.get('/reg', Controller.reg);

router.get('/profile', Controller.profile);
router.get('/rules', Controller.rules);

router.get('/exit', Controller.exitUser);
router.get('/admin', Controller.adminPage);

router.get('/getAllUsers', Controller.getAllUsers);

// PUT
router.put('/profile',[
    check('name', "Не введено имя").notEmpty(),
    check('mail', "Неправильный формат почты").notEmpty().isEmail(),
    // check('password', "Пароль должен быть длиной от 6 до 10 символов.").notEmpty().isLength({
    //     min: passMin,
    //     max: passMax
    // })
], Controller.updateUser);

// DELETE
router.delete('/profile', Controller.deleteUser)

// POST
router.post('/checkPass', Controller.checkPass);
router.post('/login', [
    check("login", "Поле логин должно быть длиной от 2 до 10 символов").notEmpty().isLength({
        min:2,
    }),
    check('pass', "Пароль должен быть длиной от 6 до 10 символов").notEmpty().isLength({
        min:passMin,
        max:passMax
    })
], Controller.getUser);

router.post('/reg',[
    check('name', "Поле имя не должно быть пустым").notEmpty(),
    check("password", "Пароль должен быть длиной от 6 до 10 символов").notEmpty().isLength({
        min:6,
    }),
    check("mail", "Неправильный формат почты").notEmpty().isEmail(),
], Controller.postUser);




export default router;