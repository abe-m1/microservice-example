import nats, { Message } from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', '123', {
  url: 'http://localhost:4222'
});

stan.on('connect', () => {
  console.log('Listener connected to NATS')


  const options = stan.subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('accounting-service')

  const subscription = stan.subscribe(
    'ticket:created', 
    'queue-group-name',
    options);

subscription.on('message', (msg: Message) => {
  const data = msg.getData();

  if (typeof data === 'string'){
    console.log(`event #${msg.getSequence()} data: ${data}`)
  }
  //send back acknowledgement
  msg.ack()
})
})

