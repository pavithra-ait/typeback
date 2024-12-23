import express, { Request, Response, NextFunction } from 'express';
import AuthController from '../Auth/userauth';

const router = express.Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await AuthController.register(req, res);
    } catch (err) {
        next(err); 
    }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await AuthController.login(req, res);
    } catch (err) {
        next(err);
    }
});

router.get('/get', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await AuthController.getdata(req, res);
    } catch (err) {
        next(err);
    }
});

export default router;
