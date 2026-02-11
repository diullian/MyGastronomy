import UsersDataAccess from "../dataAccess/users.js";
import { ok, serverError } from "../helpers/httpResponse.js";

export default class UsersControllers {
  constructor() {
    this.dataAccess = new UsersDataAccess();
  }

  async getUsers() {
    try {
      const users = await this.dataAccess.getUsers();

      console.log("ok ok ");
      console.log(users);

      return ok(users);
    } catch (err) {
      return serverError(err);
    }
  }

  async deleteUser(userId) {
    try {
      const users = await this.dataAccess.deleteUser(userId);

      return ok(users);
    } catch (err) {
      return serverError(err);
    }
  }

  async updateUser(userId, userData) {
    try {
      const users = await this.dataAccess.updateUser(userId, userData);

      return ok(users);
    } catch (err) {
      return serverError(err);
    }
  }
}
