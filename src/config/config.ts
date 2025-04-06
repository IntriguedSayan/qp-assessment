import dotenv from "dotenv";

dotenv.config();

export default{
    port: process.env.PORT || 3000,
    dbURL: process.env.DATABASE_URL!,
    jwtSecret: process.env.JWT_SECRET!,
    tokenExpiry: process.env.TOKEN_EXPIRY || '1h',  
}