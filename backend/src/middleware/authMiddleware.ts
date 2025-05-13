import jwt from 'jsonwebtoken';
import  { Response, NextFunction } from 'express'
import { Schema } from 'mongoose';


const middleAuth = (req: any, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith('Bearer ')) {
        res.status(400).json({ message: "Your token has expired or it is invalid!" });
        return;
    }

    const token = authToken.split(' ')[1];

    try {
        const decodedData = jwt.verify(token, 'your-secret-key') as {userId: string, username: Schema.Types.ObjectId };
        console.log("Decoded token:", decodedData);
        req.user = decodedData;
        next();
    } catch (err: any) {
        console.error('JWT error:', err);
        res.status(500).json({ message: err.message })
    }
}

export default middleAuth;