import {Router} from "express";
import Controller from "./controller.js";

let router = new Router();

router.get('/', Controller.index);
router.get('/game', Controller.game);

router.get('/login', Controller.login);
router.get('/reg', Controller.reg);

router.get('/profile', Controller.profile);
router.get('/rules', Controller.rules);

router.post('/login', Controller.getUser);
router.post('/reg', Controller.postUser);




export default router;