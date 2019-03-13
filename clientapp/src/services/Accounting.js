import axios from "axios";
import * as Promise from "bluebird";

export default class AccountingService {
  getAccountingData() {
    return new Promise((resolve, reject) => {
      //return axios.get("api/..");
      resolve([
        {
          ID: 1,
          Type: "Expense",
          Amount: 500,
          Description: "Internet Bill"
        },
        {
          ID: 1,
          Type: "Income",
          Amount: 5000,
          Description: "Robbery"
        }
      ]);
    });
  }
}
