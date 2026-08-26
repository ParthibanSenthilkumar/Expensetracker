import axios from "axios";
import type { FormValues } from "../Types/Registertype";
import type { AddTransaction } from "../Types/Addtransactiontype";
import { errorToast } from "../Components/Toaster";
import type { EditProfileValues } from "../Types/EditProfiletype";
import type { budget } from "../Types/Budgettype";


const BASEURL = "https://task-668b3-default-rtdb.firebaseio.com";

export const getuserdetails = async (data: FormValues, uid: string) => {
  try {
    let res = await axios.put(`${BASEURL}/Expense_Regsiter/${uid}.json`, data);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      errorToast(error.message);
      console.log(error.message);
    }
    throw new Error();
  }
};

export const Addtransaction = async (data: AddTransaction) => {
  try {
    let res = await axios.post(`${BASEURL}/Expense_addTransactions.json`, data);
    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      errorToast(err.message);
      console.log(err.message);
    }
    throw new Error();
  }
};

export const getTransactions = async():Promise<AddTransaction[]> =>{
  try{
    let res= await axios.get(`${BASEURL}/Expense_addTransactions.json`);
    if (!res.data) {
      return [];
    }
    let resarry:AddTransaction[]=Object.keys(res.data).map((key)=>({
      id:key,
      ...res.data[key]
    }
    ))
    return resarry
  }
  catch(err){
    if(err instanceof Error){
      errorToast(err.message)
      console.log(err.message)
    }
    throw new Error
  }
}

export const Editdata= async (data:AddTransaction,id:string) => {
  try{
    let res= await axios.patch(`${BASEURL}/Expense_addTransactions/${id}.json`,data)
    return res.data
  }
  catch(err){
    if(err instanceof Error){
      errorToast(err.message)
      console.log(err.message)
      throw new Error
    }
  }
}

export const deletedata = async(id:string) =>{
  try{
    let res=await axios.delete(`${BASEURL}/Expense_addTransactions/${id}.json`)
    return res.data
  }
  catch(err){
    if(err instanceof Error){
      errorToast(err.message)
      console.log(err.message)
      throw new Error
    }
  }
}

export const getTransDetails=async (id:string)=>{
  try{
    let res=await axios.get(`${BASEURL}/Expense_addTransactions/${id}.json`)
    return res.data
  }
  catch(err){
    if(err instanceof Error){
      errorToast(err.message)
      console.log(err.message)
      throw new Error
    }
  }
}

export const getUserDetails= async (uid:string) =>{
  try{
    let res=await axios.get(`${BASEURL}/Expense_Regsiter/${uid}.json`)
    return res.data
}
  catch(err){
    if(err instanceof Error){
      errorToast(err.message)
      console.log(err.message)
    }
  }
}

export const Updateprofile= async ( uid:string,data:EditProfileValues )=>{
  try{
    let res= await axios.patch(`${BASEURL}/Expense_Regsiter/${uid}.json`,data)
    return res.data
  }
  catch(err){
    if(err instanceof Error){
      errorToast(err.message)
      console.log(err.message)
    }
  }
}
export const PasswordChance= async ( uid:string)=>{
  try{
    let res= await axios.patch(`${BASEURL}/Expense_Regsiter/${uid}.json`)
    return res.data
  }
  catch(err){
    if(err instanceof Error){
      errorToast(err.message)
      console.log(err.message)
    }
  }
}

export const addBudget=async(data:budget)=>{
  try{
    let res= await axios.post(`${BASEURL}/expenseBudget.json`,data)
    return res.data
  }
  catch(err){
    if(err instanceof Error ){
      errorToast(err.message)
      throw new Error
    }
    
  }
}

export const getBudget=async(): Promise<budget[]>=>{
    try{
      let res=await axios.get(`${BASEURL}/expenseBudget.json`)
      if(!res.data){
        return []
      }
      let resarray:budget[] =Object.keys(res.data).map((key)=>({
          id:key,
          ...res.data[key]
        }))
        return resarray
    }
    catch(err){
    if(err instanceof Error ){
      errorToast(err.message)
      throw new Error
    }
    }
    throw new Error("Something went wrong while fetching budget data")
}