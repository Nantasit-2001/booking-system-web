// server/routes/rooms.ts
import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

export default async function roomsRoutes(fastify: FastifyInstance) {
  // GET /rooms
  fastify.get('/', async () => {
    return await prisma.nameRoom.findMany();
  });

  // POST /rooms
  fastify.post('/', async (request, reply) => {
    const body = request.body as any;

    const room = await prisma.nameRoom.create({
      data: {
        nameRoom: body.nameRoom,
        typeRoom: body.typeRoom,
        description: body.description,
        price: body.price,
        url_picture: body.url_picture,
        statusRoom: body.statusRoom,
      },
    });

    return reply.code(201).send(room);
  });
}
