"use client"
import {useUser} from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../utils/dbConfig'
import { eq, desc} from 'drizzle-orm'
import { Budgets, Expenses } from '../../../../utils/schema'
import ExpenseListTable from './[id]/_components/ExpenseListTable'

function page() {

    const [expensesList, setExpensesList] = useState([])

    const {user} = useUser();
    useEffect(() => {
      user&&getAllExpenses();
    },[user])

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
    <>
    <div className='p-10'>
        <ExpenseListTable expensesList={expensesList} refreshData={() => getAllExpenses()}/>
    </div>
    </>
  )
}

export default page