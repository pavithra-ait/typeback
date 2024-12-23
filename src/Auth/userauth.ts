import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../Models/User'

class AuthController {

    public async register(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

          
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ name, email, password: hashedPassword });

            return res.status(201).json({ message: 'User registered successfully', newUser });
        } catch (error) {
            console.error('Error during registration:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const { name, password } = req.body;

            const user = await User.findOne({ name });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

           
            if (!password || !user.password) {
                return res.status(400).json({ error: 'Password and hash are required' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
              
                const token = jwt.sign({ id: user._id }, 'CrUd', { expiresIn: '1h' });
                return res.status(200).json({ message: 'Login successful', token });
            } else {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }


    public async getdata(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.header('Authorization')?.split(' ')[1];
            if (!token) {
                return res.status(400).json({ error: 'Authorization token is missing' });
            }

            const decoded = jwt.verify(token, 'CrUd') as { id: string }; 

            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
}

export default new AuthController();
