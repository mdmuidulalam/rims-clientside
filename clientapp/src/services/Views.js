import axios from "axios";
import Promise from "bluebird";

export default class ViewsService {
  getDataGridColumns() {
    return axios.get("/api/datagridcolumns/get");
  }
}
