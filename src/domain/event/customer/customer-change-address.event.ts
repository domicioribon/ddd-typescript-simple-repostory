import Customer from "../../entity/customer";
import EventInterface from "../@shared/event.interface";

export default class CustomerChangeAddressEvent implements EventInterface{
  dataTimeOccurred: Date;
  eventData: Customer;

  constructor(eventData: Customer) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}