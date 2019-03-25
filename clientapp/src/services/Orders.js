import axios from "axios";

export default class OrdersService {
  getOrders() {
    return axios.get("/api/orders/get");
  }

  getOrder(id) {
    return axios.get("/api/orders/get?id=" + id);
  }

  editOrder(product) {
    return axios.put("/api/orders/edit", product);
  }
}
