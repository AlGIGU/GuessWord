import {Router} from "express";
import Controller from "./controller.js";
import {check} from "express-validator";

const passMin = 6;
const passMax = 10;

let delRouter = new Router();

// DELETE
delRouter.delete('/profile', Controller.deleteUser);

export default delRouter;