const express = require("express");
const router = express.Router();
const axios = require("axios");
const EnvelopeStatus = require("../models/EnvelopeStatus");

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
    
    console.log(response.data);

    const statusDescription = status[response.data.response.status];

    const data = response.data.response; 
    await EnvelopeStatus.upsert({
      idEnvelope: data.id,
      idRepositorio: data.Repositorio.id,
      idUsuario: data.Usuario.id,
      descricao: data.descricao,
      conteudo: data.conteudo,
      incluirHashTodasPaginas: data.incluirHashTodasPaginas,
      permitirDespachos: data.permitirDespachos,
      usarOrdem: data.usarOrdem,
      hashSHA256: data.hashSHA256,
      hashSHA512: data.hashSHA512,
      mensagem: data.mensagem,
      mensagemObservadores: data.mensagemObservadores,
      motivoCancelamento: data.motivoCancelamento,
      numeroPaginas: parseInt(data.numeroPaginas, 10),
      status: data.status,
      dataHoraCriacao: new Date(data.dataHoraCriacao),
      dataHoraConclusao: new Date(data.dataHoraConclusao),
      dataHoraAlteracao: new Date(data.dataHoraAlteracao),
      objetoContrato: data.objetoContrato,
      statusContrato: data.statusContrato,
      numContrato: data.numContrato,
      descricaoContratante: data.descricaoContratante,
      descricaoContratado: data.descricaoContratado,
      bloquearDesenhoPaginas: data.bloquearDesenhoPaginas,
      envelope: data.Envelope,
    });

    return res.json({ status: statusDescription });
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
