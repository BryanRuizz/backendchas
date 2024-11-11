const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schemas'); // Este debe contener otros tipos que ya tengas
const reservationSchema = require('./schemas/reservationSchema'); // Importar el esquema de reservas
const resolvers = require('./resolvers'); // Este debe contener otros resolvers que ya tengas
const reservationResolver = require('./resolvers/reservationResolver'); // Importar el resolver de reservas
const mysql = require('mysql2/promise');
require('dotenv').config(); 

// Combina los typeDefs
const combinedTypeDefs = [typeDefs, reservationSchema];

// Combina los resolvers
const combinedResolvers = [resolvers, reservationResolver];

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

const server = new ApolloServer({
  typeDefs: combinedTypeDefs,
  resolvers: combinedResolvers,
  context: () => {
    return { db };
  }, 
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
