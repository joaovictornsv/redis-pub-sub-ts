import Fastify from 'fastify'
import { EncondigService } from '../common/encoding';
import { RedisService } from '../common/redis';
import { EmailPublisher } from './email-pub/email-publisher';

const app = Fastify()

const redis = new RedisService()
const encodingService = new EncondigService()
const emailPublisher = new EmailPublisher(redis, encodingService)

app.post('/pub', emailPublisher.publish)

app.listen({ port: 3000 })
  .then(() => console.log('Server is running!'))