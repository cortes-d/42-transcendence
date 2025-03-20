const fastify = require('fastify')({ logger: true });
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const { initializeDatabase } = require('../database/setup');
const SqliteUserRepository = require('../database/SqliteUserRepository');
const AuthService = require('../../application/AuthService');
const routes = require('./routes');
const staticPlugin = require('@fastify/static');

// Database setup
const db = new sqlite3.Database(':memory:');
initializeDatabase(db);

// Dependency setup
const userRepository = new SqliteUserRepository(db);
const authService = new AuthService(userRepository);

// Server configuration
fastify.register(staticPlugin, {
  root: path.join(__dirname, '../../../public'),
  prefix: '/'
});

// Register routes
routes(fastify, authService);

// Start server
const start = async () => {
  try {
    await fastify.listen({ host: '0.0.0.0', port: 3000 });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();