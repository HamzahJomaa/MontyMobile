import axios from "axios"

export const getUsersApi = async () =>{
    return await axios.get(`/users.json`)
}