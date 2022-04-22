import Order from "../../domain/entity/order";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItem from "../../domain/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface{
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      { 
        customer_id: entity.customerId,
        total: entity.total() 
      },
      { where: { id: entity.id } }
    );
    await OrderItemModel.destroy({
      where: { order_id: entity.id },
    })
    const items = entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity,
      order_id: entity.id,
    }));
    await OrderItemModel.bulkCreate(items);
    const orderResult = await OrderModel.findOne({
      where: { id: entity.id },
      include: [{ model: OrderItemModel }]
    });
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne(
      {
        where: { id },
        include: [{ model: OrderItemModel }]
      }
    );
    const newOrderItems = orderModel.items.map((item) => {
      return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
    })
    const newOrder = new Order(orderModel.id, orderModel.customer_id, newOrderItems);
    return newOrder;
  }

  async findAll(): Promise<Order[]> {
    const listCustomersModel = await OrderModel.findAll({include: [{ model: OrderItemModel }]});

    const orders = listCustomersModel.map((orderModel) => {

      const newOrderItems = orderModel.items.map((item) => {
        return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
      })
      const order = new Order(orderModel.id, orderModel.customer_id, newOrderItems);
      return order;
    });

    return orders;

  }
}
