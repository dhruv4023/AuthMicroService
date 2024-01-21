import fs from "fs"
import http from "http"
import https from "https"
import app from "./src/app.js"
import config from './src/config/config.js';

let server;
if (config.protocol === 'https') {
    // Create server using https
    server = https.createServer(
        {
            key: fs.readFileSync(config.certificate.privkey, 'utf8'),
            cert: fs.readFileSync(config.certificate.fullchain, 'utf8'),
        },
        app
    );
} else {
    // Create server using http
    server = http.createServer(app);
}
server.listen(config.port, () => {
    console.log(`Server is running on ${config.protocol}://localhost:${config.port} in ${config.node_env}`);
});