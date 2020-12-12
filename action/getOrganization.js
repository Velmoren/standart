import axios from "axios";

export const getOrganization = () => {
    return axios.get('http://localhost:3000/api/organization/organization').then(res => res.data)
}

export const getAllNews = () => {
    return axios.get('http://localhost:3000/api/organization/news').then(res => res.data.MarketAction)
}