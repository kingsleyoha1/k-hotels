import amqp from 'amqplib';

class RabbitMQWrapper {
  private _connection?: amqp.Connection;
  private _channel?: amqp.Channel;
  private readonly initialConnectionDelay = 16000;
  private readonly reconnectDelay = 5000; // Reconnect after 5 seconds

  get channel() {
    if (!this._channel) {
      throw new Error('Cannot access RabbitMQ channel before connecting');
    }
    return this._channel;
  }

  async connect(url: string) {
    console.log('Waiting for RabbitMQ to be ready...');
    await new Promise(resolve => setTimeout(resolve, this.initialConnectionDelay));

    try {
      this._connection = await amqp.connect(url);
      this._channel = await this._connection.createChannel();

      this._connection.on('close', () => {
        console.log('RabbitMQ connection closed! Attempting to reconnect...');
        this.reconnect(url);
      });


    } catch (err) {
      console.error('Failed to connect to RabbitMQ:', err);
      this.reconnect(url);
    }
  }

  async reconnect(url: string) {
    setTimeout(() => this.connect(url), this.reconnectDelay);
  }

  async close() {
    if (this._channel) {
      await this._channel.close();
      console.log('RabbitMQ channel closed');
    }
    if (this._connection) {
      await this._connection.close();
      console.log('RabbitMQ connection closed');
    }
  }
}

export const rabbitMQWrapper = new RabbitMQWrapper();
