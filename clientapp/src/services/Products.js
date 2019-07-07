import axios from "axios";

export default class ProductsService {
  getProducts() {
    return axios.get("/api/products/get");
  }

  getProduct(id) {
    return axios.get("/api/products/get?id=" + id);
  }

  editProduct(product) {
    return axios.put("/api/products/edit", product);
  }
}
