import Fastify from 'fastify'
import { RedisService } from '../config/redis';
import { EmailPublisher } from './email-pub/email-publisher';

const app = Fastify()

const redis = new RedisService()
const emailPublisher = new EmailPublisher(redis)

app.post('/pub', emailPublisher.publish)

app.listen({ port: 3000 })
  .then(() => console.log('Server is running!'))