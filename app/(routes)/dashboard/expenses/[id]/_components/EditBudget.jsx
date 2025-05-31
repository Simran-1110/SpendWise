"use client"
import React, {useState, useEffect} from 'react'
import { Button } from '../../../../../../@/components/ui/button'
import { PenBox } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "../../../../../../@/components/ui/dialog"
import {Input} from '../../../../../../@/components/ui/input'
import EmojiPicker from 'emoji-picker-react'
import {db} from '../../../../../../utils/dbConfig'
import { Budgets } from '../../../../../../utils/schema'
import { toast } from 'sonner'
import {eq} from 'drizzle-orm'


function EditBudget({budgetInfo, refreshData}) {

    useEffect(() => {
        if(budgetInfo){
            setAmount(budgetInfo.amount);
            setName(budgetInfo.name);
            setEmojiIcon(budgetInfo.icon);
        }
    },[budgetInfo])

    const [emojiIcon, setEmojiIcon] = useState(null);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState();
    const [amount, setAmount] = useState();

    const onUpdateBudget = async ()=>{
        const result = await db.update(Budgets).set({
            name:name,
            amount:amount,
            icon:emojiIcon,
        }).where(eq(Budgets.id, budgetInfo.id))
        .returning();
        console.log("update", result);

        if(result){
            refreshData();
            toast('budget Updated!');
        }
    }

  return (
    <div>
        <Dialog >
          <DialogTrigger asChild>
          <Button className="bg-green-500"><PenBox/>Edit</Button>
          </DialogTrigger>
          <DialogContent className='fixed left-[40%] top-[30%] rounded-md w-1/4 flex justify-center items-start gap-3 bg-white'>
            <DialogHeader>
              <DialogTitle>Update Existing Budget</DialogTitle>
              <DialogDescription>
                <div className='mt-5'>
                  <Button variant='outline' 
                  className='text-lg'
                  onClick = {() => {
                    setOpenEmojiPicker(!openEmojiPicker)
                  }}>{emojiIcon}</Button>
                  <div className='absolute z-30'>
                  <EmojiPicker open={openEmojiPicker}
                  onEmojiClick={(e) => {setEmojiIcon(e.emoji)
                    setOpenEmojiPicker(false)}
                  }/>
                  </div>

                  <div className='mt-2'>
                    <h2 className='text-black font-medium my-1'>Budget Name</h2>
                    <Input placeholder='e.g. Home Decor' 
                    defaultValue = {budgetInfo?.name}
                    onChange={(e) => setName(e.target.value)}/>
                  </div>
                  <div className='mt-2'>
                    <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                    <Input placeholder='e.g. 2000'
                    type ="number"
                    defaultValue = {budgetInfo?.amount}
                    onChange={(e) => setAmount(e.target.value)}/>
                  </div>
                  </div>
                  
              </DialogDescription> 

              <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
              <Button 
                  className='mt-5 w-full' onClick={() => onUpdateBudget()}>Update Budget</Button>
                
              </DialogClose>
            </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
    </div>
  )
}

export default EditBudget