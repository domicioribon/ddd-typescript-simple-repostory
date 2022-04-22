import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";

export default class ChangeAddressHandler
  implements EventHandlerInterface<CustomerChangeAddressEvent>
{
  handle(event: CustomerChangeAddressEvent): void {
    // console.log(`Esse é o ChangeAddressHandler`, event.eventData.id); 
    console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.id} alterado para: ${event.eventData.Address}`)
  }
}
