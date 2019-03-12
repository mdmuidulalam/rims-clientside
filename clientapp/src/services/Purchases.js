import axios from "axios";

export default class PurchasesService {
  getPurchases() {
    return axios.get("/api/purchases/get");
  }
}
