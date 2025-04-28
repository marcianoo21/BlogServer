import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express from "express";
const router = express.Router()


const registerUser = async (req: any, res: any): Promise<void> => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with provided email already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error registering user", error });
    }
}

const loginUser = async (req: any, res: any): Promise<void> => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const properPassword = await bcrypt.compare(password, user.password);
        if (!properPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, 'your-secret-key', {
            expiresIn: '1h',
            });
            res.status(200).json({ token, message: "User logged in successfully" });
    
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
    
}

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;