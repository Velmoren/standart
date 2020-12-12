import axios from "axios";

export const getOrganization = () => {
    return axios.get('http://localhost:3000/api/organization/organization').then(res => res.data.ListOfTypes.length === 0 ? [] : res.data.ListOfTypes[0].StdList)
}