import React from 'react'
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({budgetList}) {
  return (
    <div className='border rounded-lg p-5'>
        <div className='flex flex-col items-center'>
        <h2 className='font-bold text-lg'>ACTIVITIES</h2>
        <BarChart
            width={500}
            height={300}
            data={budgetList}
            margin={{
                top:7
            }}
        >

            <XAxis dataKey='name' />
            <YAxis/>
            <Tooltip/>
            <Legend />
            <Bar dataKey='totalSpend' stackId="a" fill='#1C3B1C'/>
            <Bar dataKey='amount' stackId="a" fill='rgb(127, 207, 148)'/>
        </BarChart>
        </div>
    </div>
  )
}

export default BarChartDashboard