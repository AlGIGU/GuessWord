import {Router} from "express";
import Controller from "./controller.js";

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
router.get('/getCurrentUser', Controller.getCurrentUser);

export default router;