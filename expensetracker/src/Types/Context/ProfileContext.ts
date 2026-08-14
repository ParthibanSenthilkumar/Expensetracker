import { createContext } from "react";
import type { FormValues } from "../Registertype";

interface ProfilecontextType{
    userData:FormValues | null
    loading:boolean
}
export const ContextuserData=createContext<ProfilecontextType>({
    userData:null,
    loading:false
})