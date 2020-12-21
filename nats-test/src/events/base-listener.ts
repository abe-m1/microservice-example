import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects'

interface Event {
  //the subject must be one of the options in the Subjects enum
  subject: Subjects;
  data: any
}

//setting up listener as a generic type
export abstract class Listener <T extends Event >{
  //abstract methods must be defined inside the subclass 
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], msg: Message): void;
  private client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan){
    this.client = client;
  }

  subscriptionOptions(){
    return this.client.subscriptionOptions()
      .setDeliverAllAvailable() //when first connect send all messages created
      //on this channel
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    )

    subscription.on('message', (msg: Message) => {
      console.log(
        `Message received: ${this.subject} / ${this.queueGroupName}`
      )
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    })
  }

  parseMessage(msg: Message){
    const data = msg.getData();
    return typeof data === 'string' 
    ? JSON.parse(data) 
    : JSON.parse(data.toString('utf-8')) // if it is a buffer
  } 
}