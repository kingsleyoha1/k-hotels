import amqp from 'amqplib';


class RabbitMQWrapper {
  private _connection?: amqp.Connection;
  private _channel?: amqp.Channel;

  get channel() {
    if (!this._channel) {
      throw new Error('Cannot access RabbitMQ channel before connecting');
    }

    return this._channel;
  }

  async connect(url: string) {
    this._connection = await amqp.connect(url);
    this._channel = await this._connection.createChannel();

    console.log('Connected to RabbitMQ');
    this._connection.on('close', () => {
      console.log('RabbitMQ connection closed!');
      process.exit(0);
    });

    process.on('SIGINT', async () => await this.close());
    process.on('SIGTERM', async () => await this.close());
  }

  async close() {
    await this._channel?.close();
    await this._connection?.close();
  }
}

export const rabbitMQWrapper = new RabbitMQWrapper();
