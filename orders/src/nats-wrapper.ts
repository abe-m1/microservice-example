import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if(!this._client){
      throw new Error('Cannot access NATS client before connecting')
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string){
    this._client = nats.connect(clusterId, clusterId, { url });

    // wrap in a promise, that we will manually resolve so that 
    // when you use connect function we can put 'async' keyword before it
    return new Promise((resolve, reject):void => {
      this.client.on('connect', () => {
        console.log('connected to NATS');
        resolve('connected')
      });
      this.client.on('error' , (err) => {
        reject(err)
      })
    })
    
  }
}

export const natsWrapper = new NatsWrapper();