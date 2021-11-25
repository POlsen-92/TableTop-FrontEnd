import axios from "axios";
//local
const URL_PREFIX = "http://localhost:3001"
//delploy
// const URL_PREFIX = "https://reactauthdemo-back.herokuapp.com"

const API = {
    getProfile: (tkn)=>{
        return axios.get(`${URL_PREFIX}/api/user/profile`,{headers:{
        "Authorization": `Bearer ${tkn}`
      }})
    },
    login:(usrData)=>{
        return  axios.post(`${URL_PREFIX}/api/user/login`,usrData)
    },
    signup:(usrData)=>{
        return  axios.post(`${URL_PREFIX}/api/user/signup`,usrData)
    },
    update:(usrData,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/user/update`,usrData,{headers:{
            "Authorization": `Bearer ${tkn}`
          }})
    },
    createCampaign:(cmpgnData,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/campaign`,cmpgnData,{headers:{
            "Authorization": `Bearer ${tkn}`
          }})
    },
    deleteCampaign:(cmpgnData,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/campaign/${cmpgnData}`,{headers:{
            "Authorization": `Bearer ${tkn}`
          }})
    },
    findSelf:(tkn)=>{
        return axios.get(`${URL_PREFIX}/api/user`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    createNewBlogPost:(blogData,tkn,userId)=>{
        return axios.post(`${URL_PREFIX}/api/blog/${userId}`,blogData,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteBlogPost:(blogData,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/blog/${blogData}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    findCampaign:(id,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/campaign/${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateCampaign:(id,update,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/campaign/${id}`,update,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
}

export default API;