import axios from "axios";

export default class VendorsService {
  getVendors() {
    return axios.get("/api/vendors/get");
  }

  getVendor(id) {
    return axios.get("/api/vendors/get?id=" + id);
  }

  editVendor(product) {
    return axios.put("/api/vendors/edit", product);
  }
}
