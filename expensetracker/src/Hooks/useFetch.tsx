import  { useEffect, useState } from 'react'
import { errorToast } from '../Components/Toaster'


function useFetch<t>(fetchData:()=>Promise<t>){
    let[data,setdata]=useState<t | null >( null)
    let[loading,setloading]=useState<boolean>(false)
    let [error,seterror]=useState<string>("")

useEffect(()=>{
   
    let fetch= async ()=>{
        try{
            setloading(true)
            let resData= await fetchData()
            setdata(resData)
        }
        catch(err){
            if(err instanceof Error){
                errorToast(err.message)
               seterror(err.message)
            }
        }
        finally{
            setloading(false)
        }
    }
    fetch()
    
},[fetchData])
return {data,loading,error}
}


export default useFetch

