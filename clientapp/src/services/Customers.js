import axios from "axios";

export default class CustomersService {
  getCustomers() {
    return axios.get("/api/customers/get");
  }

  getCustomer(id) {
    return axios.get("/api/customers/get?id=" + id);
  }

  editCustomer(product) {
    return axios.put("/api/customers/edit", product);
  }
}
