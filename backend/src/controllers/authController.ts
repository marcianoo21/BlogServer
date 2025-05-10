import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express from "express";
const router = express.Router()


export const registerUser = async (req: any, res: any): Promise<void> => {
    const { username, email, password, role } = req.body;
    try {
        const existingUserEmail = await User.findOne({ email });
        if (existingUserEmail) {
            return res.status(400).json({ message: "User with provided email already exists"});
        }

        const existingUserName = await User.findOne({ username });
        if (existingUserName) {
            return res.status(400).json({ message: "User with provided username already exists"});
        }
        
        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error registering user", error });
    }
}

export const loginUser = async (req: any, res: any): Promise<void> => {
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
        const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, 'your-secret-key', {
            expiresIn: '1h',
            });
            res.status(200).json({ token, message: "User logged in successfully" });
    
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
    
}


export default router;