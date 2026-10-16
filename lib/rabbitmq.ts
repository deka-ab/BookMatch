
import amqp from "amqplib";

export async function publishBookSaved(bookId: number) {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL ??
      "amqp://bookmatch:localdevpassword@localhost:5672"
  );

  try {
    const channel = await connection.createConfirmChannel();

    await channel.assertQueue("bookmatch.events", {
      durable: true,
    });

    const event = {
      type: "BookSaved",
      bookId,
      occurredAt: new Date().toISOString(),
    };

    channel.sendToQueue(
      "bookmatch.events",
      Buffer.from(JSON.stringify(event)),
      { persistent: true }
    );

    await channel.waitForConfirms();
    await channel.close();
  } finally {
    await connection.close();
  }
}
