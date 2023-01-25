import { EncondigService } from '../../common/encoding';
import { RedisService } from '../../common/redis';

export class EmailSubscriber {
  constructor(
    private readonly redis: RedisService,
    private readonly encodingService: EncondigService
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
      const decodedMessage = this.encodingService.decode(message)

      console.log(`>> Received ${decodedMessage} from ${channel}`);
    });
  }
}