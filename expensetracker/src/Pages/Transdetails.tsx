import { useParams } from "react-router-dom"
import useFetch from "../Hooks/useFetch"
import { getTransDetails } from "../Services/Api"
import Loader from "../Components/Loader"
import { errorToast } from "../Components/Toaster"
import type { AddTransaction } from "../Types/Addtransactiontype"
import { useCallback } from "react"

const Transdetails = () => {
  let {id} =useParams()
  const fetchTransaction = useCallback(() => {
    return getTransDetails(id!);
  }, [id]);
  let {data,loading,error }=useFetch<AddTransaction>(fetchTransaction )
    console.log(data,"edit data")
  if(loading){
    return <Loader />
  }
  if (error) {
  errorToast(error);
  return null;
  }
  return (
    <div>
      <h3>Amount :{data?.amount}</h3> 
      <h3>category :{data?.category}</h3>
      <h3>Date : {data?.date}</h3>
      <h3>TransType: {data?.transType}</h3>
      <h3>Description :{data?.description}</h3>
    </div>
  )
}

export default Transdetails