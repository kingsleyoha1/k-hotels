import amqp from 'amqplib';
import { Subjects } from '@kingsley555/common-module-k-hotels';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
    abstract subject: T['subject'];
    protected channel: amqp.Channel;
  
    constructor(channel: amqp.Channel) {
      this.channel = channel;
    }
  
    async publish(data: T['data']): Promise<void> {
      // Ensure the exchange exists
      await this.channel.assertExchange(this.subject, 'topic', {
        durable: false,
      });
  
      // Publish the message to the exchange
      try {
        this.channel.publish(
          this.subject, // Exchange
          '',           // Routing key (empty for a topic exchange with no specific routing)
          Buffer.from(JSON.stringify(data)), // Message
          {}            // Options
        );
        console.log(`Event published to subject: ${this.subject}`);
      } catch (err) {
        throw err;
      }
    }
  }