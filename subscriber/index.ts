import { RedisService } from '../config/redis';
import { EmailSubscriber } from './email-sub/email-subscriber';

const redis = new RedisService();

async function start() {
  const emailSubscriber = new EmailSubscriber(redis)

  await emailSubscriber.listen()
}

start()
