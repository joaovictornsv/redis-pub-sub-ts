import { RedisService } from '../../config/redis';

export class EmailSubscriber {
  constructor(
    private readonly redis: RedisService
  ) { }

  async listen() {
    await this.subscribe()
    this.startlistenMessages()
  }

  private async subscribe() {
    await this.redis.subscribe('email-queue', (err) => {
      if (err) {
        console.error("Failed to subscribe: %s", err.message);
      } else {
        console.log('Subscribed successfully!')
      }
    })
  }

  private startlistenMessages() {
    this.redis.on("message", (channel, message) => {
      console.log(`>> Received ${message} from ${channel}`);
    });
  }
}