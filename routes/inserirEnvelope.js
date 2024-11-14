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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               params:
 *                 type: object
 *                 description: Parâmetros do envelope a serem inseridos.
 *                 example: { "titulo": "Contrato", "descricao": "Contrato de aluguel" }
 *     responses:
 *       200:
 *         description: Sucesso ao criar o envelope
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Envelope criado com sucesso"
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
      `${process.env.BASE_URL}inserirEnvelope`,
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
