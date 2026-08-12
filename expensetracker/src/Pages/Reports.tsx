
import { useState } from "react"
import Loader from "../Components/Loader"
import { errorToast } from "../Components/Toaster"
import useFetch from "../Hooks/useFetch"
import { getTransactions } from "../Services/Api"
import type { AddTransaction } from "../Types/Addtransactiontype"


const Reports = () => {
  const {data,loading,error}=useFetch<AddTransaction[]>(getTransactions)
  const [filterType,setFilterTYpe]= useState("All")
 

const incomeFilter=data?.filter((item)=>item.transType === "Income")
console.log(incomeFilter,"incomeFilter")

 const expenseFilter=data?.filter((item)=>item.transType === "Expense")
 console.log(expenseFilter,"expenseFilter")

  const totalIncome=incomeFilter?.reduce((sum,item)=>sum + Number(item?.amount),0)
  console.log(totalIncome,"totalExpense");

  const totalExpense=expenseFilter?.reduce((sum,item)=>sum + Number(item?.amount),0)
  console.log(totalExpense,"totalExpense");
   
  const totalBalance= (totalIncome || 0 ) - (totalExpense || 0)
  console.log(totalBalance,'totalBalance');
  
  const categoriesExpense=expenseFilter?.reduce((sum,item)=>{
    sum[item.category] = (sum[item.category] || 0 ) + Number(item.amount)
    return sum
  },{} as Record<string, number> )
  console.log(categoriesExpense);
  
  const categoriesIncome=incomeFilter?.reduce((sum,item)=>{
    sum[item.category]=(sum[item.category] || 0 ) + Number(item.amount)
    return sum
  },{} as Record<string,number>)
  console.log(categoriesIncome);


  let filteredData = data ?? []

    if (filterType === "Income") {
      filteredData = incomeFilter ?? []
    }

    if (filterType === "Expense") {
      filteredData = expenseFilter ?? []
    }
  

  if(loading){
    return <Loader/>
  }
  if (error){
    errorToast(error)
    return null
  }

  return (
    <>
    <div className="ccard flex items-center justify-between gap-2.5">
      <div className="card p-5 shadow rounded-lg ">
        <h3 className="text-base text-gray-400">Total Balance</h3>
        <span className="text-2xl font-bold text-gray-950">{totalBalance}</span>
      </div>
      <div className="card p-5 shadow rounded-lg ">
        <h3 className="text-base text-gray-400">Total Income</h3>
        <span className="text-2xl font-bold text-gray-950">{totalIncome}</span>
      </div>
      <div className="card p-5 shadow rounded-lg ">
        <h3 className="text-base text-gray-400">Total Balance</h3>
        <span className="text-2xl font-bold text-gray-950">{totalExpense}</span>
      </div>
    </div>


    {Object.entries(categoriesIncome ?? {} ).map(([category,amount])=>{
          const precentage=(amount/( totalIncome  || 1 ))*100
          return(
          <div key={category}>
          <h5>{category}</h5>
          <p>{amount }</p>
          <p>{precentage.toFixed(2)}%</p>
        </div>
          )
        })}

{Object.entries(categoriesExpense ?? {}).map(([category, amount]) =>{
  const precentage=(amount/(totalExpense||1))*100
return(
  <div key={category}>
    <h5>{category}</h5>
    <p>{amount }</p>
    <p>{precentage.toFixed(2)}%</p>
  </div>
)
} )}
      <button onClick={()=>setFilterTYpe("All")}>
      All
      </button>
      <button onClick={()=>setFilterTYpe("Income")}>
      income
      </button>
      <button onClick={()=>setFilterTYpe("Expense")}>Expense </button>
      <table>
        <thead>
          <tr>
          <th>Amount</th>
          <th>category</th>
          <th>date</th>
          <th>transType</th>
          <th>description</th>
          </tr>
        </thead>
        <tbody>
        
          {filteredData && filteredData?.length > 0 ?(
            filteredData.map((translist,index)=>(
              <tr key={translist.id}>
                <td>{index + 1}</td>
                <td> {translist.amount} </td>
                <td> {translist.category} </td>
                <td> {translist.date} </td>
                <td> {translist.transType} </td>
                <td> {translist.description} </td>
              </tr>
              ))
          ):(
            <td colSpan={6} >No data Found</td>
          )}
        </tbody>
      </table>
        

    </>
  )
}

export default Reports