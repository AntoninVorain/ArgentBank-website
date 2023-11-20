import API from "./api"

export const userRegistration = (userDatas) => {
  return API.post("/user/signup", userDatas)
}
export const userLogin = (userCredentials) => {
  return API.post("/user/login", userCredentials)
}
export const userGetProfile = (token) => {
  return API.post("/user/profile", {}, {headers:{Authorization:`Bearer ${token}`}})
}
