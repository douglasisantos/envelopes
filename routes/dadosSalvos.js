const express = require("express");
const router = express.Router();
const axios = require("axios");
const EnvelopeStatus = require("../models/EnvelopeStatus");

/**
 * @swagger
 * /envelopeStatus:
 *   post:
 *     summary: Obtém e armazena dados do envelope com base no ID fornecido
 *     description: Retorna o status do envelope e armazena detalhes do envelope no banco de dados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               params:
 *                 type: object
 *                 description: Parâmetros necessários para buscar o status do envelope.
 *                 example: { "idEnvelope": 123 }
 *     responses:
 *       200:
 *         description: Retorna o status do envelope e armazena as informações
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Concluído"
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
 *         description: Erro interno ao obter os dados do envelope
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao criar envelope"
 */
router.post("/", async (req, res) => {
  try {
    const { data } = await axios.post(
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

    const statusMapping = {
      1: "Em construção",
      2: "Aguardando Assinaturas",
      3: "Concluído",
      4: "Arquivado",
      5: "Cancelado",
      6: "Expirado",
    };

    console.log(data);

    const statusDescription = statusMapping[data.response.status];
    const envelopeData = data.response;

    await EnvelopeStatus.upsert({
      idEnvelope: envelopeData.id,
      idRepositorio: envelopeData.Repositorio.id,
      idUsuario: envelopeData.Usuario.id,
      descricao: envelopeData.descricao,
      conteudo: envelopeData.conteudo,
      incluirHashTodasPaginas: envelopeData.incluirHashTodasPaginas,
      permitirDespachos: envelopeData.permitirDespachos,
      usarOrdem: envelopeData.usarOrdem,
      hashSHA256: envelopeData.hashSHA256,
      hashSHA512: envelopeData.hashSHA512,
      mensagem: envelopeData.mensagem,
      mensagemObservadores: envelopeData.mensagemObservadores,
      motivoCancelamento: envelopeData.motivoCancelamento,
      numeroPaginas: parseInt(envelopeData.numeroPaginas, 10),
      status: envelopeData.status,
      dataHoraCriacao: new Date(envelopeData.dataHoraCriacao),
      dataHoraConclusao: new Date(envelopeData.dataHoraConclusao),
      dataHoraAlteracao: new Date(envelopeData.dataHoraAlteracao),
      objetoContrato: envelopeData.objetoContrato,
      statusContrato: envelopeData.statusContrato,
      numContrato: envelopeData.numContrato,
      descricaoContratante: envelopeData.descricaoContratante,
      descricaoContratado: envelopeData.descricaoContratado,
      bloquearDesenhoPaginas: envelopeData.bloquearDesenhoPaginas,
      envelope: envelopeData.Envelope,
    });

    return res.json({ status: statusDescription });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data?.error || "Erro ao criar envelope";
    res.status(error.response ? 400 : 500).json({ error: errorMessage });
  }
});

module.exports = router;
