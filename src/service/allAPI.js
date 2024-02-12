import { commonAPI } from "./commonAPI"
import { BASE_URL } from "./serverURL"


//register API
export const registerAPI = async (users)=>{
   return await commonAPI('POST',`${BASE_URL}/user/register`,users,"")
}


//login API
export const loginAPI = async (users)=>{
   return await commonAPI('POST',`${BASE_URL}/user/login`,users,"")
}

// logic to add report
export const addReportAPI = async (reqBody,reqHeader)=>{
   return await commonAPI('POST',`${BASE_URL}/report/add`,reqBody,reqHeader)
}

// home report
export const homeReportsAPI = async ()=>{
   return await commonAPI('GET',`${BASE_URL}/report/home-report`)
 
}

// all report
export const allReportsAPI = async (searchKey, reqHeader)=>{
   //query parameter = path?key = value
   return await commonAPI('GET',`${BASE_URL}/report/all-report?search=${searchKey}`,"",reqHeader)
 
}


//user report
export const userReportsAPI = async (reqHeader)=>{
   return await commonAPI('GET',`${BASE_URL}/user/all-report`,"",reqHeader)
 
}

//edit report
export const editReportsAPI = async (reportId,reqBody, reqHeader)=>{
   // id is passed as path parameter
   return await commonAPI('PUT',`${BASE_URL}/report/edit/${reportId}`,reqBody,reqHeader)
}

//delete report 
export const deleteUserReportsAPI = async (reportId, reqHeader)=>{
   // id is passed as path parameter
   return await commonAPI('DELETE',`${BASE_URL}/report/remove/${reportId}`,{},reqHeader)
}


//edit profile 
export const editProfileAPI = async (reqBody, reqHeader)=>{
   // id is passed as path parameter
   return await commonAPI('PUT',`${BASE_URL}/user/edit/`,reqBody,reqHeader)
}

//get all solved reports
export const allSolvedReports = async (searchKey, reqHeader)=>{
   //query parameter = path?key = value
   return await commonAPI('GET',`${BASE_URL}/solvedreport?search=${searchKey}`,"",reqHeader)
 
}

// logic to add report
export const addSolvedReportAPI = async (reqBody , reqHeader)=>{
   return await commonAPI('POST',`${BASE_URL}/solved-report/add`,reqBody,reqHeader)
}

// logic to delete the solvedreport
export const deleteSolvedReportsAPI = async (reportId, reqHeader)=>{
   // id is passed as path parameter
   return await commonAPI('DELETE',`${BASE_URL}/solved-report/remove/${reportId}`,{},reqHeader)
}
