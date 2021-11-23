import axios from "axios";
//local
const URL_PREFIX = "http://localhost:3001"
//delploy
// const URL_PREFIX = "https://reactauthdemo-back.herokuapp.com"

const API = {
    getProfile: (tkn)=>{
        return axios.get(`${URL_PREFIX}/api/users/profile`,{headers:{
        "Authorization": `Bearer ${tkn}`
      }})
    },
    login:(usrData)=>{
        return  axios.post(`${URL_PREFIX}/api/users/login`,usrData)
    },
    signup:(usrData)=>{
        return  axios.post(`${URL_PREFIX}/api/users/signup`,usrData)
    },
    update:(usrData,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/users/update`,usrData,{headers:{
            "Authorization": `Bearer ${tkn}`
          }})
    }
}

export default API;