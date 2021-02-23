if (!process.env.NODE_ENV || process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  console.log(process.env.CLIENT_URL);
  const express = require("express");
  //const cors = require("cors");
  const sanitizeData = require("./app/middlewares/sanitizeData");
  const app = express();
  //const corsConfig = require("./app/config/cors");
  
  const session = require("express-session");
  
  //the router
  const router = require("./app/router");
  const multer = require("multer");
  const bodyParser = multer();
  
  // cors
  
  // app.use(
  //   cors(corsConfig)
  // );
  
  //session
  
  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
  }));
  
  const PORT = process.env.PORT || 5050;
  
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
    next();
  });
  
  
  app.use(express.static(__dirname + "/app/public"));
  
  
  app.set("models", "./app/models");
  /**/
  // réglages des views pour le back-office
  app.set("views", "./app/views");
  app.set("view engine", "ejs");
  // les statiques
  //app.use(express.static("public"));
  
  // on rajoute la gestion des POST body
  app.use(express.urlencoded({ extended: true }));
  
  
  app.use(express.json());
  app.use(bodyParser.any());
  app.use(sanitizeData);
  app.use(router);
  
  
  // lancement du serveur
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
  
  // toutes les promesses qu'on n'entoure pas d'un try/catch seront automatiquement stoppées ici si elles sont rejetées
  process.on("unhandledRejection", (err) => {
    console.log("Interception d'un rejet de promesse");
    console.error(err);
  });
  module.exports = app;