import {Router} from "express";
import Controller from "./controller.js";
import {check} from "express-validator";

const passMin = 6;
const passMax = 10;

const putRouter = new Router();

// PUT
putRouter.put('/profile',[
    check('name', "Не введено имя").notEmpty(),
    check('mail', "Неправильный формат почты").notEmpty().isEmail(),
    // check('password', "Пароль должен быть длиной от 6 до 10 символов.").notEmpty().isLength({
    //     min: passMin,
    //     max: passMax
    // })
], Controller.updateUser);

export default putRouter;