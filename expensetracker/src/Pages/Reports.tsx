
import { useState } from "react"
import Loader from "../Components/Loader"
import { errorToast } from "../Components/Toaster"
import useFetch from "../Hooks/useFetch"
import { getTransactions } from "../Services/Api"
import type { AddTransaction } from "../Types/Addtransactiontype"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import SummaryCard from "../Components/Reports-compo/SummaryCard"


const Reports = () => {
  const {data,loading,error}=useFetch<AddTransaction[]>(getTransactions)
  const [filterType,setFilterTYpe]= useState("All")
 

const incomeFilter=data?.filter((item)=>item.transType === "Income")
console.log(incomeFilter,"incomeFilter")

 const expenseFilter=data?.filter((item)=>item.transType === "Expense")
 console.log(expenseFilter,"expenseFilter")

  const totalIncome=incomeFilter?.reduce((sum,item)=>sum + Number(item?.amount),0) ?? 0
  console.log(totalIncome,"totalExpense");

  const totalExpense=expenseFilter?.reduce((sum,item)=>sum + Number(item?.amount),0) ?? 0
  console.log(totalExpense,"totalExpense");
   
  const totalBalance= (totalIncome || 0 ) - (totalExpense || 0)
  console.log(totalBalance,'totalBalance');
  
  const categoriesExpense=expenseFilter?.reduce((sum,item)=>{
    sum[item.category] = (sum[item.category] || 0 ) + Number(item.amount)
    return sum
  },{} as Record<string, number> )
  console.log(categoriesExpense);
  
  const expenseChartData = Object.entries(categoriesExpense ?? {}).map(([category,amount])=>({
    Name:category,
    value:amount,
  }))

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
  
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
];

  if(loading){
    return <Loader/>
  }
  if (error){
    errorToast(error)
    return null
  }

  return (
    <>

    <SummaryCard totalBalance={totalBalance} totalIncome={totalIncome} totalExpense={totalExpense} />


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

<div className="w-full max-w-[500px] h-[350px]">
<ResponsiveContainer width='100%' height={"100%"}>
    <PieChart>
      <Pie
        data={expenseChartData}
        dataKey="value"
        nameKey="Name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label
      >
      {expenseChartData.map((item,index)=>(
        <Cell key={item.Name} fill={COLORS[index % COLORS.length ]}     />
      )) }
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
</ResponsiveContainer>
</div>


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