import axios from "axios";
import Promise from "bluebird";
import { resolve, reject } from "q";

export default class ViewsService {
  getDataGridColumns(cookies) {
    return new Promise((resolve, reject) => {
      let allColumns = cookies.get("allColumns");
      if (allColumns == undefined) {
        resolve(
          axios.get("/api/clientViews/getDataGridColumns").then(response => {
            response.data.entity.map(col => {
              col.accessor = col.Accessor;
              delete col.Accessor;
              return col;
            });
            cookies.set("allColumns", response.data.entity, {
              path: "/home"
            });
            return response.data.entity;
          })
        );
      } else {
        resolve(allColumns);
      }
    });
  }

  getEntityAreas(cookies) {
    return new Promise((resolve, reject) => {
      let allAreasAndFields = cookies.get("allAreasAndFields");
      if (allAreasAndFields == undefined) {
        resolve(
          axios
            .get("/api/clientViews/getEntityAreasAndFields")
            .then(response => {
              cookies.set("allAreasAndFields", response.data.entity, {
                path: "/home"
              });
              return response.data.entity;
            })
        );
      } else {
        resolve(allAreasAndFields);
      }
    });
  }
}
