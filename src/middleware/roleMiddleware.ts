import { Request, Response, NextFunction } from 'express';

const checkRole = (requiredRole: string) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ message: "Access denied: insufficient permissions" });
        }
        next();
    }
    
}

