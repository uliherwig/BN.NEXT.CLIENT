// lib/kafka/consumer.ts
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'nextjs-infobox',
  brokers: ['localhost:9092'], // deine Kafka-Adresse
})

const consumer = kafka.consumer({ groupId: 'infobox-group' })

export async function startKafkaConsumer() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'strategy', fromBeginning: false })

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const userId = topic.split('.')[2] // z. B. ui.infobox.user123
      const payload = JSON.parse(message.value!.toString())

      console.log(`Received message for user ${userId}:`, payload)

    },
  })
}
