const fs = require("fs");

function logRoutes(app, outputFilePath = "routes.txt") {
  const routes = [];

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      const routePath = middleware.route.path;
      const routeMethods = Object.keys(middleware.route.methods);
      routeMethods.forEach((method) => {
        routes.push(`${method.toUpperCase()} ${routePath}`);
      });
    } else if (middleware.name === "router") {
      middleware.handle.stack.forEach((nestedMiddleware) => {
        if (nestedMiddleware.route) {
          const routePath = nestedMiddleware.route.path;
          const routeMethods = Object.keys(nestedMiddleware.route.methods);
          routeMethods.forEach((method) => {
            routes.push(`${method.toUpperCase()} ${routePath}`);
          });
        }
      });
    }
  });

  fs.writeFileSync(outputFilePath, routes.join("\n"), "utf8");
  console.log(`API routes have been logged to ${outputFilePath}`);
}

module.exports = { logRoutes };
