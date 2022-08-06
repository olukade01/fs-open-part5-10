const baseUrl = "/api/users"
import axios from "axios"

const getUsers = async () => {
 const response = await axios.get(baseUrl)
 return response.data
}

export default getUsers