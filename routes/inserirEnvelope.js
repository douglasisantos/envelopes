const express = require("express");
const router = express.Router();
const axios = require("axios");

/**
 * @swagger
 * /inserirEnvelope:
 *   post:
 *     summary: Cria um novo envelope
 *     description: Envia um novo envelope para a plataforma de assinatura utilizando o token de autenticação.
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   params:
 *                     type: object
 *                     description: Parâmetros do envelope a serem inseridos.
 *                     example: { "titulo": "Contrato", "descricao": "Contrato de aluguel" }
 *     responses:
 *       200:
 *         description: Sucesso ao criar o envelope
 *         content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: "Envelope criado com sucesso"
 *       400:
 *         description: Erro de validação nos parâmetros enviados
 *         content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: "Parâmetro inválido"
 *       500:
 *         description: Erro interno ao criar o envelope
 *         content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: "Erro ao criar envelope"
 */
router.post("", async (req, res) => {
  try {
      console.log(process.env.BASE_URL);
      const response = await axios.post(`${process.env.BASE_URL}inserirEnvelope`, {
          token: process.env.TOKEN,
          params: req.body.params,
      },{
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
      });
      res.json(response.data);
  } catch (error) {
      console.log(error);
      if (error.response && error.response.data.error) {
          res.status(400).json({ error: error.response.data.error });
      } else {
          res.status(500).json({ error: "Erro ao criar envelope" });
      }
  }
});

module.exports = router;
