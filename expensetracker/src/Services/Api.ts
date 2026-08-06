import axios from "axios";
import type { FormValues } from "../Types/Registertype";
import type { AddTransaction } from "../Types/Addtransactiontype";
import { errorToast } from "../Components/Toaster";

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

export const getTransactions = async ( fetchData:AddTransaction ) =>{
  try{
    let res= await axios.get(`${BASEURL}/Expense_addTransactions.json`);
    return res.data
  }
  catch(err){
    if(err instanceof Error){
      errorToast(err.message)
      console.log(err.message)
    }
    throw new Error
  }
}
