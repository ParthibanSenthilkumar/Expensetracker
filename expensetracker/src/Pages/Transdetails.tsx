import { useParams } from "react-router-dom"
import useFetch from "../Hooks/useFetch"
import { getTransDetails } from "../Services/Api"
import Loader from "../Components/Loader"
import { errorToast } from "../Components/Toaster"


const Transdetails = () => {
  let {id} =useParams()
  let {data,loading,error }=useFetch(()=> getTransDetails(id!) )
  if(loading){
    return <Loader />
  }
  if (error) {
  errorToast(error);
  return null;

  }
  return (
    <div>
      {data}
    </div>
  )
}

export default Transdetails