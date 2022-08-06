import {Router} from "express";
import Controller from "./controller.js";
import {check} from "express-validator";

const passMin = 6;
const passMax = 10;

let postRouter = new Router();

// POST
postRouter.post('/checkPass', Controller.checkPass);
postRouter.post('/login', [
    check("login", "Поле логин должно быть длиной от 2 до 10 символов").notEmpty().isLength({
        min:2,
    }),
    check('pass', "Пароль должен быть длиной от 6 до 10 символов").notEmpty().isLength({
        min:passMin,
        max:passMax
    })
], Controller.getUser);

postRouter.post('/reg',[
    check('name', "Поле имя не должно быть пустым").notEmpty(),
    check("password", "Пароль должен быть длиной от 6 до 10 символов").notEmpty().isLength({
        min:6,
    }),
    check("mail", "Неправильный формат почты").notEmpty().isEmail(),
], Controller.postUser);

export default postRouter;