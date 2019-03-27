import axios from "axios";
import Promise from "bluebird";

export default class AccountingService {
  getAccountingData() {
    return new Promise((resolve, reject) => {
      //return axios.get("api/..");
      resolve({
        data: {
          success: true,
          entity: [
            {
              Id: 1,
              AccountingType: "Expense",
              Amount: 500,
              Description: "Internet Bill"
            },
            {
              Id: 1,
              AccountingType: "Income",
              Amount: 5000,
              Description: "Robbery"
            }
          ]
        }
      });
    });
  }
}
