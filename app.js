require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const sequelize = require("./database");
const inserirEnvelopeRota = require("./routes/inserirEnvelope");
const signatarioRota = require("./routes/signatario");
const envelopeAssinaturaRota = require("./routes/envelopeAssinatura");
const statusEnvelopeRota = require("./routes/statusEnvelope");
const dadosSalvosRota= require("./routes/dadosSalvos");

const app = express();
const PORT = process.env.PORT || 3000;


const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Asten Assinatura",
      version: "1.0.0",
      description: "Documentação para integração com Asten Assinatura",
    },
  },
  apis: ["./routes/*.js"],
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.get("/", (req, res) => res.send("Bem-vindo à API Asten Assinatura!"));
sequelize.sync()
  .then(() => {
    console.log("Banco de dados conectado e sincronizado");
    app.use("/api/inserirEnvelope/", inserirEnvelopeRota);
    app.use("/api/signatario/", signatarioRota);
    app.use("/api/envelopeAssinatura/", envelopeAssinaturaRota);
    app.use("/api/statusEnvelope/", statusEnvelopeRota);
    app.use("/api/dadosSalvos/", dadosSalvosRota);
    app.listen(PORT, () => {
      console.log(`Servidor ativo na porta ${PORT}`);
    });
  })
  .catch((error) => console.error("Erro ao conectar ao banco:", error));
