const express = require("express");
const cors = require("cors");
const db = require("./models");
const response = require("./middlewares/response");
const checkJwt = require("./middlewares/jwt");

const authController = require("./controllers/auth");
const linkController = require("./controllers/link");

const app = express();

app.use(cors);
app.use(response);
app.use(checkJwt);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authController); // rota de autenticação
app.use("/link", linkController); // rota de autenticação

// request & response
app.get("/", (req, res) => {
  return res.json("API rodando...");
});

/* init db */
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Rodando na porta 3001");
  });
});
