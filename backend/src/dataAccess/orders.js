import { Mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = "orders";

export default class OrdersDataAccess {
  async getOrders() {
    const result = await Mongo.db
      .collection(collectionName)
      .aggregate([
        {
          $lookup: {
            from: "orderItems",
            localField: "_id",
            foreignField: "orderId",
            as: "orderItems",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $project: {
            //remover os campos password e salt de ser exibido na resposta da api chamada
            "userDetails.password": 0,
            "userDetails.salt": 0,
          },
        },
        {
          $unwind: "$orderItems",
        },
        {
          $lookup: {
            from: "plates",
            localField: "orderItems.plateId",
            foreignField: "_id",
            as: "orderItems.itemDetails",
          },
        },
      ])
      .toArray();

    return result;
  }

  //getorders por usuario

  async getOrdersByUserId(userId) {
    const result = await Mongo.db
      .collection(collectionName)
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "orderItems",
            localField: "_id",
            foreignField: "orderId",
            as: "orderItems",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $project: {
            //remover os campos password e salt de ser exibido na resposta da api chamada
            "userDetails.password": 0,
            "userDetails.salt": 0,
          },
        },
        {
          $unwind: "$orderItems",
        },
        {
          $lookup: {
            from: "plates",
            localField: "orderItems.plateId",
            foreignField: "_id",
            as: "orderItems.itemDetails",
          },
        },
      ])
      .toArray();

    return result;
  }

  async addOrder(orderData) {
    const { items, ...orderDataRest } = orderData;

    //setando dados na ordem (data, status e usuario id)
    orderData.createdAt = new Date();
    orderData.pickupStatus = "Pending";
    orderData.userId = new ObjectId(orderDataRest.userId);

    const newOrder = await Mongo.db
      .collection(collectionName)
      .insertOne(orderData);

    if (!newOrder.insertedId) {
      throw new Error("Order cannot be inserted");
    }

    items.map((item) => {
      item.plateId = new ObjectId(item.plateId);
      item.orderId = new ObjectId(newOrder.insertedId);
    });

    //se inseriu a ordem, vamos inserir agora os items
    const result = await Mongo.db.collection("orderItems").insertMany(items);

    //nos items, vamos saber qual é o prato, quantidade, etc.

    console.log("----- apos insert ------");
    console.log(result);
    return result;
  }

  async deleteOrder(orderId) {
    if (orderId) {
      const result = await Mongo.db
        .collection(collectionName)
        .findOneAndDelete({ _id: new ObjectId(orderId) });

      return result;
    }
  }

  async updateOrder(orderId, orderData) {
    if (orderId) {
      const result = await Mongo.db
        .collection(collectionName)
        .findOneAndUpdate({ _id: new ObjectId(orderId) }, { $set: orderData });

      return result;
    }
  }
}
