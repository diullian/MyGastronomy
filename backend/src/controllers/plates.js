import PlatesDataAccess from "../dataAccess/plates.js";
import { ok, serverError } from "../helpers/httpResponse.js";

export default class PlatesControllers {
  constructor() {
    this.dataAccess = new PlatesDataAccess();
  }

  async getPlates() {
    try {
      const plates = await this.dataAccess.getPlates();

      return ok(plates);
    } catch (err) {
      return serverError(err);
    }
  }

  async getAvailablePlates() {
    try {
      const plates = await this.dataAccess.getAvailablePlates();
      return ok(plates);
    } catch (err) {
      return serverError(err);
    }
  }

  async addPlate(plateData) {
    try {
      const result = await this.dataAccess.addPlate(plateData);

      return ok(result);
    } catch (err) {
      return serverError(err);
    }
  }

  async deletePlate(plateId) {
    try {
      const plates = await this.dataAccess.deletePlate(plateId);

      return ok(plates);
    } catch (err) {
      return serverError(err);
    }
  }

  async updatePlates(plateId, plateData) {
    try {
      const plates = await this.dataAccess.updatePlate(plateId, plateData);
      console.log("ALTERADO COM SUCESSO");
      return ok(plates);
    } catch (err) {
      console.log("ERRO EM ALTERAR");
      console.log(err);
      return serverError(err);
    }
  }
}
