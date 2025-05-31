"use client"
import React, {useEffect, useState} from 'react'
import { Budgets, Expenses } from '../../../../../utils/schema'
import { db } from '../../../../../utils/dbConfig'
import { getTableColumns, sql, eq, desc} from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpense from './_components/AddExpense'
import ExpenseListTable from './_components/ExpenseListTable'
import { Button } from '../../../../../@/components/ui/button'
import { ArrowLeft, Trash } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../../@/components/ui/alert-dialog"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import EditBudget from './_components/EditBudget'

function ExpensesScreen({params}) {

    const {user} = useUser();
    const [budgetInfo, setBudgetInfo] = useState();
    const [expensesList,setExpensesList] = useState([]);
    const route = useRouter();
    useEffect(()=>{
        user&&getBudgetInfo();
    },[user])

    const getBudgetInfo = async()=>{
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend:sql `sum(CAST(${Expenses.amount} AS numeric))`.mapWith(Number),
            totalItem: sql `count(${Expenses.id})`.mapWith(Number)
          }).from(Budgets)
          .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
          .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
          .where(eq(Budgets.id, params.id))
          .groupBy(Budgets.id)
        
          setBudgetInfo(result[0]);
          getExpensesList();
          console.log(result[0]);
    }

    const getExpensesList = async ()=>{
      const result = await db.select().from(Expenses)
      .where(eq(Expenses.budgetId,params.id))
      .orderBy(desc(Expenses.id))
      setExpensesList(result)
      console.log("expensesList", result)
    }

    const deleteBudget = async()=> {

      const deleteExpenseResult = await db.delete(Expenses)
      .where(eq(Expenses.budgetId,params.id))
      .returning()

      if(deleteExpenseResult){
        const result = await db.delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning()

        toast('Budget Deleted!');
        route.replace('/dashboard/budgets')
      }

    }

  return (
    <div className='p-10'>
      
    <h2 className='text-2xl font-bold flex justify-between'>
      <span className='flex gap-2 items-center'>
        <ArrowLeft onClick={() => route.back()} className='cursor-pointer'></ArrowLeft>
      My Expenses
      </span>
      <div className='flex gap-2 items-center'>
        <EditBudget budgetInfo={budgetInfo} refreshData={() => getBudgetInfo()}/>

    <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button className='flex gap-2 cursor-pointer' variant="destructive"> <Trash/> Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="fixed top-[40%] left-[40%] gap-3 w-1/4 bg-white p-4 rounded-lg" >
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the current budget alongwith all the associated expenses from our server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-end items-center gap-2">
          <AlertDialogCancel className="m-0">Cancel</AlertDialogCancel>
          <AlertDialogAction className="border" onClick={() => deleteBudget()}>Delete Budget</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      </div>
    </h2>
    
    <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {budgetInfo? <BudgetItem 
            budget={budgetInfo}
        />:
        <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'>  
        </div>}

        <AddExpense budgetId={params.id} 
        user = {user}
        refreshData={() => getBudgetInfo()}
        />
    </div>

    <div className='mt-4'>
      <ExpenseListTable expensesList={expensesList} refreshData={() => getBudgetInfo()}/>
    </div>
    </div>
  )
}

export default ExpensesScreen