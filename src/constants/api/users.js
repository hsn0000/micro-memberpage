import axios from '../../configs/axios'

export default {
  login: (credentials) => axios.post("/users/login", credentials),
  register: (payload) => axios.post("/users/register", payload),
  refresh: (credential) => axios.post("/refresh-tokens", { refresh_token: credential.refresh_token, email: credential.email}), 
  details: () => axios.get("/users"),
  update: (data) => axios.put("/users", data),
  logout: () => axios.post("/users/logout")
}