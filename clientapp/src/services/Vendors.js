import axios from "axios";

export default class VendorsService {
  getVendors() {
    return axios.get("/api/vendors/get");
  }
}
