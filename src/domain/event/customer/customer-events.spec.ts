import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher"
import CustomerChangeAddressEvent from "./customer-change-address.event";
import CustomerCreatedEvent from "./customer-created.event";
import ChangeAddressHandler from "./handler/change-address.handler";
import EnviaConsoleLog1Handler from "./handler/envia-console-log-1-handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log-2-handler";

describe("Test customer domain events", () => {

  it("should dispatcher customer created events", () => {
    const eventDispatcher = new EventDispatcher();
    // log 1
    const eventHandlerLog1 = new EnviaConsoleLog1Handler();
    const spyEventHandler1 = jest.spyOn(eventHandlerLog1, "handle");
    // log 2
    const eventHandlerLog2 = new EnviaConsoleLog2Handler();
    const spyEventHandler2 = jest.spyOn(eventHandlerLog2, "handle");

    // registers
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerLog1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerLog2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandlerLog1);
    
    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "123",
      name: "John Doe",
    });

    // log 1
    eventHandlerLog1.handle(customerCreatedEvent);
    expect(spyEventHandler1).toHaveBeenCalled();
    // log 2
    eventHandlerLog2.handle(customerCreatedEvent);
    expect(spyEventHandler2).toHaveBeenCalled();
  })

  it("should dispatcher customer change address event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ChangeAddressHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]
    ).toMatchObject(eventHandler);
    
    // init customer
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.Address = address;
    
    // change address
    const address2 = new Address("Street 2", 456, "13330-250", "São Paulo");
    customer.changeAddress(address2);

    const customerChangeAddressEvent = new CustomerChangeAddressEvent(customer);
    eventHandler.handle(customerChangeAddressEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  })
  
})