require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const inserirEnvelopeRoutes = require("./routes/inserirEnvelope");
const signatarioRoutes = require("./routes/signatario");
const envelopeAssinaturaRoutes = require("./routes/envelopeAssinatura");
const statusEnvelopeRoutes = require("./routes/statusEnvelope");
const dadosSalvosRoutes = require("./routes/dadosSalvos");
const sequelize = require("./database");

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
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.get("/", (req, res) => res.send("Bem-vindo à API Asten Assinatura!"));

sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados conectado e sincronizado");

    app.use("/api/inserirEnvelope", inserirEnvelopeRoutes);
    app.use("/api/signatario", signatarioRoutes);
    app.use("/api/envelopeAssinatura", envelopeAssinaturaRoutes);
    app.use("/api/statusEnvelope", statusEnvelopeRoutes);
    app.use("/api/dadosSalvos", dadosSalvosRoutes);

    app.listen(PORT, () => {
      console.log(`Servidor ativo na porta ${PORT}. Pronto para uso!`);
    });
  })
  .catch((error) => console.error("Erro ao conectar ao banco:", error));
