const express = require("express");
const loggerMiddleWare = require("morgan");
const corsMiddleWare = require("cors");
const authMiddleware = require("./auth/middleware");
const authRouter = require("./routers/auth");
const userRouter = require("./routers/userRouter");
const adminRouter = require("./routers/adminRouter");
const PORT = 4000;
const app = express();

/**
 * morgan:
 *
 * simple logging middleware so you can see
 * what happened to your request
 *
 * example:
 *
 * METHOD   PATH        STATUS  RESPONSE_TIME   - Content-Length
 *
 * GET      /           200     1.807 ms        - 15
 * POST     /echo       200     10.251 ms       - 26
 * POST     /puppies    404     1.027 ms        - 147
 *
 * github: https://github.com/expressjs/morgan
 *
 */

app.use(loggerMiddleWare("dev"));

/**
 *
 * express.json():
 * be able to read request bodies of JSON requests
 * a.k.a. body-parser
 * Needed to be able to POST / PUT / PATCH
 *
 * docs: https://expressjs.com/en/api.html#express.json
 *
 */

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

/**
 *
 * cors middleware:
 *
 * Since our api is hosted on a different domain than our client
 * we are are doing "Cross Origin Resource Sharing" (cors)
 * Cross origin resource sharing is disabled by express by default
 * for safety reasons (should everybody be able to use your api, I don't think so!)
 *
 * We are configuring cors to accept all incoming requests
 * If you want to limit this, you can look into "white listing" only certain domains
 *
 * docs: https://expressjs.com/en/resources/middleware/cors.html
 *
 */

app.use(corsMiddleWare());

/**
 *
 * delay middleware
 *
 * Since our api and client run on the same machine in development mode
 * the request come in within milliseconds
 * To simulate normal network traffic this simple middleware delays
 * the incoming requests by 1500 second
 * This allows you to practice with showing loading spinners in the client
 *
 * - it's only used when you use npm run dev to start your app
 * - the delay time can be configured in the package.json
 */

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

/**
 *
 * authMiddleware:
 *
 * When a token is provided:
 * decrypts a jsonwebtoken to find a userId
 * queries the database to find the user with that add id
 * adds it to the request object
 * user can be accessed as req.user when handling a request
 * req.user is a sequelize User model instance
 *
 * When no or an invalid token is provided:
 * returns a 4xx reponse with an error message
 *
 * check: auth/middleware.js
 * */

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", adminRouter);
// Listen for connections on specified port (default is port 4000)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
