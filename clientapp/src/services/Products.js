import axios from "axios";

export default class ProductsService {
  getProducts() {
    return axios.get("/api/products/get");
  }
}
