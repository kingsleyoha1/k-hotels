import amqp, { ConsumeMessage } from 'amqplib';
import { Subjects } from '@kingsley555/common-module-k-hotels';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], msg: ConsumeMessage): void;
  protected channel: amqp.Channel;

  constructor(channel: amqp.Channel) {
    this.channel = channel;
  }

  async listen() {
    // Ensure the exchange exists
    await this.channel.assertExchange(this.subject, 'topic', {
      durable: false,
    });

    // Assert a queue exists and bind it to the exchange
    const q = await this.channel.assertQueue(this.queueGroupName, {
      durable: true,
    });
    await this.channel.bindQueue(q.queue, this.subject, '');

    // Consume messages from the queue
    this.channel.consume(q.queue, (msg: ConsumeMessage | null) => {
      if (msg) {
        console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

        const data = this.parseMessage(msg);
        this.onMessage(data, msg);

        // Acknowledge the message
        // this.channel.ack(msg);
      }
    });
  }

  parseMessage(msg: ConsumeMessage) {
    const content = msg.content;
    return JSON.parse(content.toString());
  }
}
