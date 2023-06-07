import axios from "axios"

export const SignInApi = async () =>{
    return await axios.get(`/authentication.json`)
}