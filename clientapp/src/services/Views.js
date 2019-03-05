import axios from "axios";
import Promise from "bluebird";

export default class ViewsService {
  getDataGridColumns() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            entity: [
              {
                Id: 1,
                GridType: 1,
                Header: "Name",
                accessor: "ProductName",
                SortOrder: 1
              },
              {
                Id: 2,
                GridType: 1,
                Header: "Quantity On Hand",
                accessor: "ProductQuantityOnHand",
                SortOrder: 3
              },
              {
                Id: 3,
                GridType: 1,
                Header: "Price",
                accessor: "ProductPrice",
                SortOrder: 2
              },
              {
                Id: 4,
                GridType: 2,
                Header: "Phone",
                accessor: "CustomerPhone",
                SortOrder: 2
              },
              {
                Id: 5,
                GridType: 2,
                Header: "Name",
                accessor: "CustomerName",
                SortOrder: 1
              }
            ]
          }
        });
      }, 2000);
    });
  }
}
