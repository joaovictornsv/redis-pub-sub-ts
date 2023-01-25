import { FastifyRequest } from 'fastify';
import { RedisService, CHANNEL } from '../../config/redis';

export class EmailPublisher {
  constructor(
    private readonly redis: RedisService
  ) { }

  publish = async (request: FastifyRequest) => {
    const message = this.buildMessage(request)
    await this.publishMessage(message)
  }

  private buildMessage(request: FastifyRequest) {
    const body = request.body
    const message = JSON.stringify(body);

    return message
  }

  private async publishMessage(message: string) {
    await this.redis.publish(CHANNEL, message)
    console.log('>> Message publish with content:', message);
  }

}