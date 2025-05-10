import { Request, Response, NextFunction } from 'express';

export const checkRole = (requiredRole: string) => {
    return (req: any, res: any, next: NextFunction) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ message: "Access denied: insufficient permissions" });
        }
        next();
    }
    
}

