import OrdersDataAccess from "../dataAccess/orders.js";
import { ok, serverError } from "../helpers/httpResponse.js";

export default class OrdersControllers {
  constructor() {
    this.dataAccess = new OrdersDataAccess();
  }

  async getOrders() {
    try {
      const orders = await this.dataAccess.getOrders();

      return ok(orders);
    } catch (err) {
      return serverError(err);
    }
  }

  async getOrdersByUserId(userId) {
    try {
      const orders = await this.dataAccess.getOrdersByUserId(userId);

      return ok(orders);
    } catch (err) {
      return serverError(err);
    }
  }

  async addOrder(orderData) {
    try {
      const result = await this.dataAccess.addOrder(orderData);

      return ok(result);
    } catch (err) {
      return serverError(err);
    }
  }

  async deleteOrder(orderId) {
    try {
      const orders = await this.dataAccess.deleteOrder(orderId);

      return ok(orders);
    } catch (err) {
      return serverError(err);
    }
  }

  async updateOrders(orderId, orderData) {
    try {
      const orders = await this.dataAccess.updateOrder(orderId, orderData);
      console.log("ALTERADO COM SUCESSO");
      return ok(orders);
    } catch (err) {
      console.log("ERRO EM ALTERAR");
      console.log(err);
      return serverError(err);
    }
  }
}
