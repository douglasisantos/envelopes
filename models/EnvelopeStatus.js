const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const EnvelopeStatus = sequelize.define("EnvelopeStatus", {
  idEnvelope: {
    type: DataTypes.STRING,
    allowNull: false,
   },
  idRepositorio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
  },
  conteudo: {
    type: DataTypes.TEXT,
  },
  incluirHashTodasPaginas: {
    type: DataTypes.STRING,
  },
  permitirDespachos: {
    type: DataTypes.STRING,
  },
  usarOrdem: {
    type: DataTypes.STRING,
  },
  hashSHA256: {
    type: DataTypes.STRING,
  },
  hashSHA512: {
    type: DataTypes.STRING,
  },
  mensagem: {
    type: DataTypes.TEXT,
  },
  mensagemObservadores: {
    type: DataTypes.TEXT,
  },
  motivoCancelamento: {
    type: DataTypes.STRING,
  },
  numeroPaginas: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
  },
  dataHoraCriacao: {
    type: DataTypes.DATE,
  },
  dataHoraConclusao: {
    type: DataTypes.DATE,
  },
  dataHoraAlteracao: {
    type: DataTypes.DATE,
  },
  objetoContrato: {
    type: DataTypes.TEXT,
  },
  statusContrato: {
    type: DataTypes.STRING,
  },
  numContrato: {
    type: DataTypes.STRING,
  },
  descricaoContratante: {
    type: DataTypes.STRING,
  },
  descricaoContratado: {
    type: DataTypes.STRING,
  },
  bloquearDesenhoPaginas: {
    type: DataTypes.STRING,
  },
  envelope: {
    type: DataTypes.STRING,
  },
});

module.exports = EnvelopeStatus;
