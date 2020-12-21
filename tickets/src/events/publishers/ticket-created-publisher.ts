import { Publisher, Subjects, TicketCreatedEvent } from '@abemtickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
  readonly subject = Subjects.TicketCreated;
  
}