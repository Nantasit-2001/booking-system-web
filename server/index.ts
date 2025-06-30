import Fastify from 'fastify';
import roomsRoutes from './routes/rooms';

const fastify = Fastify({ logger: true });

// Register routes
fastify.register(roomsRoutes, { prefix: '/rooms' });

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log('Server running on http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();