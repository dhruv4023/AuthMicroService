import express from 'express';
import { globSync } from 'glob';
import path from 'path';
const router = express.Router();

// Find all route files in the specified directory
const routes = globSync('src/routes/**/index.js', {
    ignore: 'src/routes/*.js',
});

// Iterate over each route file and add it to the router
routes.forEach(async route => {
    const routeModule = await import(
        route.replace(path.join('src', 'routes'), './')
    );
    // Add the route to the router
    router.use('', routeModule.default);
});

// exporting router
export default router;
