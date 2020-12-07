import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto'

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222'
})

stan.on('connect', () => {
  console.log('publisher connected to nats');

  stan.on('close', () => {
    console.log('nats collection closed')
    process.exit();
  })

  // NATS only accepts strings
  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20
  })

  stan.publish('ticket:created', data, () => {
    console.log('Event published')

  });
});

//looking for interrupt or teminate signals
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());


