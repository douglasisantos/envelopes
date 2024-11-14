const express = require("express");
const router = express.Router();
const axios = require("axios");

/**
 * @swagger
 * /statusEnvelope:
 *   post:
 *     summary: Consulta o status de um envelope
 *     description: Retorna o status atual de um envelope com base no código de status retornado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               params:
 *                 type: object
 *                 description: Parâmetros para identificar o envelope.
 *                 example: { "idEnvelope": 456 }
 *     responses:
 *       200:
 *         description: Sucesso na consulta do status do envelope
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: O status descritivo do envelope.
 *                   example: "Aguardando Assinaturas"
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
 *         description: Erro interno ao consultar o status do envelope
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
      `${process.env.BASE_URL}getDadosEnvelope`,
      { token: process.env.TOKEN, params },
      { headers: { Accept: "application/json", "Content-Type": "application/json" } }
    );

    const statusMap = {
      1: "Em construção",
      2: "Aguardando Assinaturas",
      3: "Concluído",
      4: "Arquivado",
      5: "Cancelado",
      6: "Expirado",
    };

    return res.json({ status: statusMap[data.response.status] });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data?.error || "Erro ao criar envelope";
    res.status(error.response ? 400 : 500).json({ error: errorMessage });
  }
});

module.exports = router;
