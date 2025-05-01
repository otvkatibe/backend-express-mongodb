import express from 'express';
import exampleController from '../controller/example.controller.js';
import verifyToken from '../middlewares/jwt.token.middleware.js';

const router = express.Router();

router.get('/', verifyToken, exampleController.SecuredExample);

export default router;
