import axios from "axios"
import type { FormValues } from "../Types/Registertype"


const BASEURL="https://task-668b3-default-rtdb.firebaseio.com"

export const getuserdetails= async ( data:FormValues )=>{
    try{
        let res= await axios.post(`${BASEURL}/Expense_Regsiter.json`,data)
        return res.data
    }
    catch(error){
        if(error instanceof Error){
            console.log(error.message)
        }    
        throw new Error()
    }
}