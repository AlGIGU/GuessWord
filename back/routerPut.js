import {Router} from "express";
import Controller from "./controller.js";
import {check} from "express-validator";

const putRouter = new Router();

// PUT
putRouter.put('/profile',[
    check('name', "Неправильный формат имени").notEmpty().matches(Controller.userNameReg),

    check('mail', "Неправильный формат почты").notEmpty().matches(Controller.mailReg),

    check('coins', 'Неправильный формат счёта').notEmpty().matches(Controller.scoreReg),

], Controller.updateUser);

export default putRouter;