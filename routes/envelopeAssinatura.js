const express = require("express");
const router = express.Router();
const axios = require("axios");

/**
 * @swagger
 * /envelopeAssinatura:
 *   post:
 *     summary: Cria e encaminha um envelope para assinaturas
 *     description: Envia um envelope para a plataforma de assinatura utilizando o token de autenticação.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               params:
 *                 type: object
 *                 description: Parâmetros do envelope a serem enviados para assinatura.
 *                 example: { "idDocumento": 123, "tipo": "contrato" }
 *     responses:
 *       200:
 *         description: Sucesso ao criar e encaminhar envelope
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Envelope enviado com sucesso"
 *       400:
 *         description: Erro de validação nos parâmetros enviados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Parâmetro inválido"
 *       500:
 *         description: Erro interno ao criar o envelope
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao criar envelope"
 */

// Função para criar um envelope
router.post("", async (req, res) => {
  try {
    console.log(process.env.BASE_URL);
    const response = await axios.post(
      `${process.env.BASE_URL}encaminharEnvelopeParaAssinaturas`,
      {
        token: process.env.TOKEN,
        params: req.body.params,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
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
