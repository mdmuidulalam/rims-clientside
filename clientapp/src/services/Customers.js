import axios from "axios";

export default class CustomersService {
  getCustomers() {
    return axios.get("/api/customers/get");
  }
}
