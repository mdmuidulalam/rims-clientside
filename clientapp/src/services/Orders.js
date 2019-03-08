import axios from "axios";

export default class OrdersService {
  getOrders() {
    return axios.get("/api/orders/get");
  }
}
