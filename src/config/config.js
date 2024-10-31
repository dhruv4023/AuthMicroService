import dotenv from 'dotenv';
dotenv.config();

export default {
    // database details
    database: {
        db_url: process.env.DB_URL || "mongodb://127.0.0.1:27017",
        db_name: process.env.DB_NAME || "AuthenticationDB",
    },
    mail: {
        sender_email: process.env.SENDER_EMAIL,
        sender_password: process.env.SENDER_PASSWORD
    },
    cloudinary: {
        name: process.env.CLOUDINARY_CLOUD_NAME,
        key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
    //  ssl Keys details
    certificate: {
        privkey: process.env.SERVER_KEY || "ssl/server-key.pem",
        fullchain: process.env.SERVER_CERT || "ssl/server-cert.pem",
    },
    google: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
    },
    redirect_url: process.env.REDIRECT_URL || 'http://localhost:5001',
    protocol: process.env.PROTOCOL || 'http',
    port: process.env.APP_PORT || 5001,
    app_base_url: process.env.APP_BASE_URL || 'http://localhost:5001/api/v1',
    node_env: process.env.NODE_ENV || 'development',
    origin_url_list: process.env.ORIGIN_URL_LIST || '[ "http://localhost:3000" ]',
    jwt_secret: process.env.JWT_SECRET,
    session_secret: process.env.SESSION_SECRET || "SESSION_SECRET",
    crypto_secret: process.env.CRYPTO_SECRET || "CRYPTO_SECRET",
    DEGUB: process.env.DEGUB || false,
}; 
