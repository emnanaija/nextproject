const { Pool } = require('pg');

// Configuration de la connexion
const pool = new Pool({
  user: 'postgres', // Nom d'utilisateur PostgreSQL
  host: 'localhost', // Adresse de l'hôte de la base de données
  database: 'mydatabase', // Nom de la base de données
  password: 'LENA1812a621',
  port: 5432, // Par défaut pour PostgreSQL// Port par défaut de PostgreSQL
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
