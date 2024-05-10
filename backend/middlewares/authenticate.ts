import { Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthenticatedRequest } from '../interfaces/authenticatedRequest'
import LogoutController from '../controllers/logout.controller';

dotenv.config();

const JWT_SECRET = process.env.SECRET_KEY as Secret;

// Middleware to authenticate JWT
export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // Unauthorized

    if (isBlacklisted(token)) {
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403); // Forbidden
        const payload = decoded as { [key: string]: any };
        req.userId = payload.userId
        next();
    });
}

function isBlacklisted(token: string): boolean {
    return LogoutController.blacklist.includes(token);
}