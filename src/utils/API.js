import axios from "axios";
//local
const URL_PREFIX = "http://localhost:3001"
//delploy
// const URL_PREFIX = "https://table-top-be.herokuapp.com/"

const API = {
    // ~~~~~~~~~~~~~~~~~~~~~~~USER ROUTES~~~~~~~~~~~~~~~~~~~~~~~~~~~//
    signup:(usrData)=>{
        return  axios.post(`${URL_PREFIX}/api/user/signup`,usrData)
    },
    login:(usrData)=>{
        return  axios.post(`${URL_PREFIX}/api/user/login`,usrData)
    },
    findSelf:(tkn)=>{
        return axios.get(`${URL_PREFIX}/api/user`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    findUserById:(id)=>{
        return axios.get(`${URL_PREFIX}/api/user/id${id}`)
    },
    findUserByEmail:(email,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/user/email${email}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getProfile: (tkn)=>{
        return axios.get(`${URL_PREFIX}/api/user/profile`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    update:(usrData,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/user/update`,usrData,{headers:{
            "Authorization": `Bearer ${tkn}`
          }})
    },
    deleteUser:(tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/user`,{headers:{
            "Authorization": `Bearer ${tkn}`
          }})
    },

    // ~~~~~~~~~~~~~~~~~~~~~CAMPAIGN ROUTES~~~~~~~~~~~~~~~~~~~~~~~~//
    createCampaign:(cmpgnData,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/campaign`,cmpgnData,{headers:{
            "Authorization": `Bearer ${tkn}`
          }})
    },
    findCampaign:(id,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/campaign/id${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateCampaign:(id,update,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/campaign/${id}`,update,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteCampaign:(cmpgnData,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/campaign/${cmpgnData}`,{headers:{
            "Authorization": `Bearer ${tkn}`
          }})
    },

    // ~~~~~~~~~~~~~~~~~~~~~USERCAMPAIGN ROUTES~~~~~~~~~~~~~~~~~~~~~~~~//
    createUserCampaign:(campaign_id,tkn)=>{
        // console.log(campaign_id);
        return axios.post(`${URL_PREFIX}/api/usercampaign`,{campaign_id,},{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    gmDelUserCampaign:(campaign_id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/usercampaign/gmdel${campaign_id}`,{},{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    userDelUserCampaign:(campaign_id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/usercampaign/userdel${campaign_id}`,{},{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },

    // ~~~~~~~~~~~~~~~~~~~~~~~INVITE ROUTES~~~~~~~~~~~~~~~~~~~~~~~~~~~//
    createInvite:(invite,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/invite/`, invite,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteInvite:(id,tkn)=>{
        // console.log("i am trying to delete this invite");
        return axios.delete(`${URL_PREFIX}/api/invite/${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },

    // ~~~~~~~~~~~~~~~~~~~~~CHARACTER ROUTES~~~~~~~~~~~~~~~~~~~~~~~~//
    createCharacter: (charData,campaign_id,tkn) => {
        return axios.post(`${URL_PREFIX}/api/character/camp${campaign_id}`, charData, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    findCharacter: (id) => {
        return axios.get(`${URL_PREFIX}/api/character/id${id}`)
    },
    findCharacterbyUser: (user_id) => {
        return axios.get(`${URL_PREFIX}/api/character/user${user_id}`)
    },
    findCharacterbyCampaign: (campaign_id) => {
        return axios.get(`${URL_PREFIX}/api/character/camp${campaign_id}`)
    },
    updateCharacter: (charData,id,tkn) => {
        return axios.put(`${URL_PREFIX}/api/character/update${id}`, charData, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteCharacter: (charData,id,tkn) => {
        return axios.delete(`${URL_PREFIX}/api/character/${id}`, charData, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },

    // ~~~~~~~~~~~~~~~~~~~~~INVENTORY ROUTES~~~~~~~~~~~~~~~~~~~~~~~~// 
    createInventory: (inventData,tkn) => {
        return axios.post(`${URL_PREFIX}/api/inventory`,inventData, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    findInventoryItem:(id,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/inventory/${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    findInventorybyChar:(id,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/inventory/${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateInventory: (id,inventData,tkn) => {
        return axios.put(`${URL_PREFIX}/api/inventory/${id}`,inventData, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteInventory: (id,tkn) => {
        return axios.delete(`${URL_PREFIX}/api/inventory/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },


    // ~~~~~~~~~~~~~~~~~~~~~~~SPELL ROUTES~~~~~~~~~~~~~~~~~~~~~~~~~~~//
    createNewSpell:(spellData,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/spell`,spellData,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    findSingleSpell:(id,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/spell/${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    findSpellbyChar:(id,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/spell/${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateSpell:(id,spellData,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/spell/${id}`,spellData,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteSpell:(id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/spell/${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },


    // ~~~~~~~~~~~~~~~~~~~~~~~FEATURE ROUTES~~~~~~~~~~~~~~~~~~~~~~~~~//
    createNewFeature:(featureData,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/feature`,featureData,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    findSingleFeature:(id,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/feature/${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    findFeaturebyChar:(id,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/feature/${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateFeature:(id,featureData,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/feature/${id}`,featureData,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteFeature:(id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/feature/${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },


    // ~~~~~~~~~~~~~~~~~~~~~PROFICIENCY ROUTES~~~~~~~~~~~~~~~~~~~~~~~//
    createNewProficiency:(id,proficiencyData,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/proficiency/${id}`,proficiencyData,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    findSingleProficiency:(id,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/proficiency/${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    findProficiencybyChar:(id,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/proficiency/${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateProficiency:(id,proficiencyData,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/proficiency/${id}`,proficiencyData,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteProficiency:(id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/proficiency/${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },



    // ~~~~~~~~~~~~~~~~~~~~~~~BLOG ROUTES~~~~~~~~~~~~~~~~~~~~~~~~~~~//
    createNewBlogPost:(blogData,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/blog`,blogData,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    findBlogPost:(id,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/blog/${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateBlogPost:(id,blogData,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/blog/${id}`,blogData,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteBlogPost:(id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/blog/${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },

    // ~~~~~~~~~~~~~~~~~~~~~COMMENT ROUTES~~~~~~~~~~~~~~~~~~~~~~~~//
    createComment: (id,commentData,tkn) => {
        return axios.post(`${URL_PREFIX}/api/comment/${id}`, commentData,  {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    findComment:(id,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/comment/${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateComment: (id,commentData,tkn) => {
        return axios.put(`${URL_PREFIX}/api/comment/${id}`, commentData, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteComment: (id,tkn) => {
        return axios.delete(`${URL_PREFIX}/api/comment/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
}

export default API;