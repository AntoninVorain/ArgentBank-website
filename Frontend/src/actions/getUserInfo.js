import API from "../API/api"
import { userLogin, userGetProfile } from "../API/userAPI"

export const loginUser = (email, password) => async dispatch => {
  try {
    const response = await userLogin()
    /*
    récupérer le token de la réponse localStorage / sessionStorage
    userGetProfile(token)
    dispatch type userLogin success
    */
  }
  catch (error) {
    console.log(error)
    dispatch({
      type: "USER_LOGIN_FAILURE", 
      payload: error.message
    })
  }
}