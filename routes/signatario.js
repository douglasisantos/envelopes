const express = require("express");
const router = express.Router();
const axios = require("axios");

/**
 * @swagger
 * /signatario:
 *   post:
 *     summary: Adiciona um signatário a um envelope
 *     description: Insere um signatário no envelope identificado utilizando o token de autenticação.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               params:
 *                 type: object
 *                 description: Parâmetros para o signatário a ser inserido.
 *                 example: { "nome": "João Silva", "email": "joao.silva@example.com", "idEnvelope": 123 }
 *     responses:
 *       200:
 *         description: Sucesso ao inserir o signatário no envelope
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Signatário inserido com sucesso"
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
 *         description: Erro interno ao inserir o signatário no envelope
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
      `${process.env.BASE_URL}inserirSignatarioEnvelope`,
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
