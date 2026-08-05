import React, { useState} from "react"
import type {AddTransaction} from '../Types/Addtransactiontype'
import { Addtransaction } from "../Services/Api"

const Addtransactions = () => {

  const [transData,settransData]=useState <AddTransaction> ({
    amount:"",
    category:"",
    description:"",
    date:""
  })
  const handleChance=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
    let {name,value}=e.target
    settransData((prev)=>({
       ...prev,
      [name]:value
    }))
  }
  const handleSubmit= async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    await Addtransaction(transData)
    console.log(transData,"transData");
  }
  return (
    <>
    <section className="addtransaction">
        <h3 className="section-title">Add Transactions</h3>
        <div className="type">
          <h4>type</h4>
          <button>Income</button>
          <button>Expense</button>
        </div>
        <div className="form_group">
            <form onSubmit={ handleSubmit }>
               <div className="form_item">
                  <label htmlFor="amount"> Amount</label>
                  <input type="text" name="amount" id="amount" placeholder="Enter The Amount" value={transData.amount} onChange={handleChance} />
               </div>
                <div className="form_item">
                  <label> Category</label>
                  <select value={transData.category}  onChange={handleChance}> 
                    <option value="">-- select category --</option>
                    <option value="Food Expense">Food Expense </option>
                    <option value="Entertaiment">Entertaiment </option>
                    <option value="Fuel">Fuel </option>
                    <option value="Salary">Salary</option>
                    <option value="Clothings">Clothings</option>
                    <option value="others">others</option>
                  </select>
               </div>
               <div className="form_item">
                  <label> Description</label>
                  <textarea placeholder="Enter Description" value={transData.description} onChange={handleChance}></textarea>
               </div>
               <div className="form_item">
                <label>Date</label>
                <input type="date" value={transData.date}  onChange={handleChance}/>
               </div>
               <button type="submit" className=""> Add Transaction </button>
            </form>
        </div>
    </section>
      
    </>
  )
}

export default Addtransactions