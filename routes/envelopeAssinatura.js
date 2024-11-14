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
router.post("", async (req, res) => {
  try {
    const { params } = req.body;
    const { data } = await axios.post(
      `${process.env.BASE_URL}encaminharEnvelopeParaAssinaturas`,
      { token: process.env.TOKEN, params },
      { headers: { Accept: "application/json", "Content-Type": "application/json" } }
    );
    res.json(data);
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data?.error || "Erro ao criar envelope";
    res.status(error.response ? 400 : 500).json({ error: errorMessage });
  }
});

module.exports = router;
