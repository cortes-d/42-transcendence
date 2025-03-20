module.exports = (fastify, authService) => {
    fastify.post('/login', async (request, reply) => {
      try {
        const user = await authService.authenticate(
          request.body.username,
          request.body.password
        );
        reply.send({ success: true, message: 'Login successful!' });
      } catch (error) {
        reply.status(401).send({ success: false, message: error.message });
      }
    });
  
    fastify.post('/register', async (request, reply) => {
      try {
        const user = await authService.register(
          request.body.username,
          request.body.password
        );
        reply.send({ 
          success: true, 
          message: 'Registration successful!',
          user: { id: user.id, username: user.username }
        });
      } catch (error) {
        reply.status(400).send({ success: false, message: error.message });
      }
    });
  };