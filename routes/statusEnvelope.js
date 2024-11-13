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
    const response = await axios.post(
      `${process.env.BASE_URL}getDadosEnvelope`,
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

    let status = {
      1: "Em construção",
      2: "Aguardando Assinaturas",
      3: "Concluído", 
      4: "Arquivado",
      5: "Cancelado",
      6: "Expirado",
    };  
    return res.json({'status': status[response.data.response.status]});
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
