import React, { useState } from 'react'
import { createContext } from 'react'

export const addReportResponseContext = createContext()
export const editReportResponseContext = createContext()
export const isAuthTokenContext =  createContext()

function ContextShare({children}) {
    // children is a predefined prop used to share data b/w all the components
    // data to share
    const [addReportResponse, setAddReportResponse]= useState({})
    const [editReportResponse, setEditReportResponse]= useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(true)
  return (
    <>
    {/* provider - provide the data to the components
        children - provide data to every component
        value = data to be provided */}
    <addReportResponseContext.Provider value={{addReportResponse, setAddReportResponse}}>
    <editReportResponseContext.Provider value={{editReportResponse, setEditReportResponse}}>
    <isAuthTokenContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      {children}
    </isAuthTokenContext.Provider>
    </editReportResponseContext.Provider>
    </addReportResponseContext.Provider>
    
    </>
  )
}

export default ContextShare