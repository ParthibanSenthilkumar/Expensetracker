import axios from "axios"
import type { FormValues } from "../Types/Registertype"
import type { AddTransaction } from "../Types/Addtransactiontype"

const BASEURL="https://task-668b3-default-rtdb.firebaseio.com"

export const getuserdetails= async ( data:FormValues,uid:string )=>{
    try{
        let res= await axios.put(`${BASEURL}/Expense_Regsiter/${uid}.json`,data)
        return res.data
    } 
    catch(error){
        if(error instanceof Error){
            console.log(error.message)
        }    
        throw new Error()
    }
}

export const Addtransaction = async (data:AddTransaction)=>{
    try{
        let res = await axios.post(`${BASEURL}/Expense_addTransactions.json`,data)
        return res.data
    }
    catch(err){
        if(err instanceof Error){
            console.log(err.message)
        }
        throw new Error
    }
}