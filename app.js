require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const inserirEnvelopeRoutes = require('./routes/inserirEnvelope');
const signatarioRoutes = require('./routes/signatario');
const envelopeAssinaturaRoutes = require('./routes/envelopeAssinatura');
const statusEnvelopeRoutes = require('./routes/statusEnvelope');


const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Asten Assinatura',
      version: '1.0.0',
      description: 'Documentação da API para integração com Asten Assinatura',
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


// Rota inicial
app.get('/', (req, res) => {
  res.send('API Asten Assinatura Integrada');
});



// Rotas de Envelopes
app.use('/api/inserirEnvelope/', inserirEnvelopeRoutes); // Verifique se a rota está assim
app.use('/api/signatario/', signatarioRoutes); // Verifique se a rota está assim
app.use('/api/envelopeAssinatura/', envelopeAssinaturaRoutes);
app.use('/api/statusEnvelope/', statusEnvelopeRoutes);

// Inicialização do Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./meu_banco.db', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conexão com o banco de dados SQLite estabelecida.');
    
    // Criação da tabela
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )`, (err) => {
      if (err) console.error('Erro ao criar a tabela:', err.message);
      else console.log('Tabela "usuarios" criada com sucesso.');

      // Inserção de dados
      const nome = 'Douglas';
      const email = 'douglas@example.com';
      db.run(`INSERT INTO usuarios (nome, email) VALUES (?, ?)`, [nome, email], function(err) {
        if (err) console.error('Erro ao inserir dados:', err.message);
        else console.log(`Novo usuário inserido com o ID ${this.lastID}`);
        
        // Consulta de dados
        db.all(`SELECT * FROM usuarios`, [], (err, rows) => {
          if (err) console.error('Erro ao consultar dados:', err.message);
          else {
            console.log('Lista de usuários:');
            rows.forEach((row) => {
              console.log(`${row.id} - ${row.nome} - ${row.email}`);
            });
          }
          
          // Fechando o banco de dados
          db.close((err) => {
            if (err) console.error('Erro ao fechar o banco de dados:', err.message);
            else console.log('Conexão com o banco de dados SQLite fechada.');
          });
        });
      });
    });
  }
});

