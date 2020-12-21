import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const stan = nats.connect('ticketing', 'abx', {
  url: 'http://localhost:4222'
})

stan.on('connect', async () => {
  console.log('publisher connected to nats');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '124',
      title: 'concert',
      price: 20
    })
  } catch(err){
    console.error(err)
  }
 

  // NATS only accepts strings
  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: 20
  // })

  // stan.publish('ticket:created', data, () => {
  //   console.log('Event published')

  // });
});

//looking for interrupt or teminate signals
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());


