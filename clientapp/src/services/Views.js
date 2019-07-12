import axios from "axios";
import Promise from "bluebird";

export default class ViewsService {
  getDataGridColumns() {
    return new Promise((resolve, reject) => {
      let allColumns = JSON.parse(localStorage.getItem('allColumns'));
      if (allColumns == undefined) {
        resolve(
          axios.get("/api/clientViews/getDataGridColumns").then(response => {
            response.data.entity.map(col => {
              col.accessor = col.Accessor;
              delete col.Accessor;
              return col;
            });
            localStorage.setItem('allColumns', JSON.stringify(response.data.entity));
            return response.data.entity;
          })
        );
      } else {
        resolve(allColumns);
      }
    });
  }

  getEntityAreas() {
    return new Promise((resolve, reject) => {
      let allAreasAndFields = JSON.parse(localStorage.getItem('allAreasAndFields'));
      if (allAreasAndFields == undefined) {
        resolve(
          axios
            .get("/api/clientViews/getEntityAreasAndFields")
            .then(response => {
              localStorage.setItem('allAreasAndFields', JSON.stringify(response.data.entity));
              return response.data.entity;
            })
        );
      } else {
        resolve(allAreasAndFields);
      }
    });
  }
}
