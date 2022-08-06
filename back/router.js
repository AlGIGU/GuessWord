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

export default router;