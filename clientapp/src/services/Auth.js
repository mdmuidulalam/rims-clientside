import axios from "axios";

export default class Auth {
  login(email, password) {
    return axios.post("/api/auth/login", {
      Email: email,
      Password: password
    });
  }
}
