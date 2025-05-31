"use client"
import {useUser} from '@clerk/nextjs'
import CardInfo from './_components/CardInfo'
import React, { useEffect, useState } from 'react'
import { db } from '../../../utils/dbConfig'
import { getTableColumns, sql, eq, desc} from 'drizzle-orm'
import { Budgets, Expenses } from '../../../utils/schema'
import BarChartDashboard from './_components/BarChartDashboard'
import BudgetItem from './budgets/_components/BudgetItem'
import ExpenseListTable from './expenses/[id]/_components/ExpenseListTable'

function Dashboard() {
  const [budgetList, setBudgetList]= useState([])
  const [expensesList, setExpensesList] = useState([])

  const {user} = useUser();
  useEffect(() => {
    user&&getBudgetList();
  },[user])

  const getBudgetList = async()=> {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(CAST(${Expenses.amount} AS numeric))`.mapWith(Number),
      totalItem: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id));
    console.log("result" , result);
    setBudgetList(result);
    getAllExpenses()
  }

  const getAllExpenses = async () => {
    const result = await db.select({
      id:Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id))
    setExpensesList(result)
  }


  return (
    <div className='p-8'>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName}✌️</h2>
      <p className='text-gray-500'>Here's Your Expense Snapshot: Let's Take Control Together!</p>
      <CardInfo budgetList={budgetList}/>
      <div className='grid grid-col-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
            <BarChartDashboard 
              budgetList={budgetList}
            />
            <ExpenseListTable expensesList={expensesList} refreshData={() => getBudgetList()}/>
        </div>
        <div className='grid gap-3'>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
            {
              budgetList.map((budget, index) => (
                <BudgetItem budget={budget} key={index} />
              ))
            }
        </div>
      </div>
    </div>

  )
}

export default Dashboard