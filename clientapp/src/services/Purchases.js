import axios from "axios";

export default class PurchasesService {
  getPurchases() {
    return axios.get("/api/purchases/get");
  }

  getPurchase(id) {
    return axios.get("/api/purchases/get?id=" + id);
  }

  editPurchase(product) {
    return axios.put("/api/purchases/edit", product);
  }
}
