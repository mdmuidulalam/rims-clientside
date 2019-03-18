import axios from "axios";
import Promise from "bluebird";
import { resolve, reject } from "q";

export default class ViewsService {
  getDataGridColumns() {
    return axios.get("/api/clientViews/getDataGridColumns");
  }

  getEntityAreas() {
    return axios.get("/api/clientViews/getEntityAreasAndFields");
  }
}
