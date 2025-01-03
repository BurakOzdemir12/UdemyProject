import React, { createContext, useContext } from 'react'

const AuthContext = createContext();

export const useAuth= ( )=>useContext(AuthContext);
export const AuthProvider = ({children})=>{
       const [user,setUser]=React.useState(null);
       const login=(email,password)=>{
              setUser({email,password});
       }
       const logout=()=>{
              setUser(null);
       }
       const value={user,login,logout};
       return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}