import dotenv from 'dotenv';
dotenv.config();

export default {
    // database details
    database: {
        db_url: process.env.DB_URL || "mongodb://127.0.0.1:27017",
        db_name: process.env.DB_NAME,
    },
    mail: {
        sender_email: process.env.SENDER_EMAIL,
        sender_password: process.env.SENDER_PASSWORD
    },
    cloudnary: {
        name: process.env.CLOUDINARY_CLOUD_NAME,
        key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
    //  ssl Keys details
    certificate: {
        privkey: process.env.SERVER_KEY || 'path to priv key',
        fullchain: process.env.SERVER_CERT || 'path to fullchain key',
    },
    protocol: process.env.PROTOCOL || 'http',
    port: process.env.APP_PORT || 8088,
    app_base_url: process.env.APP_BASS_URL || 'http://localhost:8088/api/v1',
    app_project_path: process.env.APP_PROJECT_PATH || 'http://localhost:4040',
    node_env: process.env.NODE_ENV || 'development',
    origin_url_list: process.env.ORIGIN_URL_LIST || '[ "http://localhost:3000" ]',
    jwt_secret: process.env.JWT_SECRECT,
};
