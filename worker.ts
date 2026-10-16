
import amqp from "amqplib";

async function startWorker() {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL ??
      "amqp://bookmatch:localdevpassword@localhost:5672"
  );

  const channel = await connection.createChannel();

  await channel.assertQueue("bookmatch.events", {
    durable: true,
  });

  channel.prefetch(1);

  console.log("Bookmatch worker kjører");

  await channel.consume("bookmatch.events", async (message) => {
    if (!message) return;

    try {
      const event = JSON.parse(message.content.toString());

      if (event.type === "BookSaved") {
        console.log("Ny bok lagret:", event.bookId);

        // Senere kan du oppdatere anbefalingsdata her.
      }

      channel.ack(message);
    } catch (error) {
      console.error("Kunne ikke behandle hendelsen:", error);

      // Avvis meldingen uten automatisk re-køing.
      // I produksjon bør du konfigurere en dead-letter queue.
      channel.nack(message, false, false);
    }
  });
}

startWorker().catch(console.error);
