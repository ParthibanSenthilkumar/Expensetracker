
import Loader from "../Components/Loader"
import { errorToast } from "../Components/Toaster"
import useFetch from "../Hooks/useFetch"
import { getTransactions } from "../Services/Api"
import type { AddTransaction } from "../Types/Addtransactiontype"


const Reports = () => {
  let {data,loading,error}=useFetch<AddTransaction[]>(getTransactions)

  const incomeFilter=data?.filter((item)=>item.transType === "Income")
  console.log(incomeFilter,"incomeFilter")

  const totalIncome=incomeFilter?.reduce((sum,item)=> sum + Number(item?.amount),0)
  console.log(totalIncome,"totalIncome");
    
  const expenseFilter=data?.filter((item)=>item.transType === "Expense")
  console.log(expenseFilter,"expenseFilter")

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
   


  if(loading){
    return <Loader/>
  }
  if (error){
    errorToast(error)
    return null
  }

  return (
    <>
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
          {data && data?.length > 0 ?(
            data.map((translist,index)=>(
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
{Object.entries(categoriesIncome ?? {}).map(([category, amount]) => (
  <div key={category}>
    <h5>{category}</h5>
    <p>{amount }</p>
  </div>
))}
{Object.entries(categoriesExpense ?? {}).map(([category, amount]) => (
  <div key={category}>
    <h5>{category}</h5>
    <p>{amount }</p>
  </div>
))}

    </>
  )
}

export default Reports