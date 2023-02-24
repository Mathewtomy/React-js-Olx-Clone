import React,{createContext,useState} from 'react'
import data from '../components/Posts/Data';
export const AllPostContext = createContext(null) ;

function ContextAllPost({children}) {
    const [allPost,setAllPost]=useState([])
    return (
        <AllPostContext.Provider value={{allPost,setAllPost}}>
            {children}
        </AllPostContext.Provider>
    )
}

export default ContextAllPost
