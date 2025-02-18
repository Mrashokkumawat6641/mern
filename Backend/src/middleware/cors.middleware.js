export const corsMiddleware = (req, res, next) => {
  const allowedOrigins = ["http://localhost:5173"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // Important for cookies

  if (req.method === "OPTIONS") {
      return res.sendStatus(204);
  }

  next();
};
