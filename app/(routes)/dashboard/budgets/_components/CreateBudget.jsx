"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "../../../../../@/components/ui/dialog"
import {Button} from '../../../../../@/components/ui/button'
import {Input} from '../../../../../@/components/ui/input'
import EmojiPicker from 'emoji-picker-react'
import {db} from '../../../../../utils/dbConfig'
import { Budgets } from '../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'



function CreateBudget({refreshData}) {

  const [emojiIcon, setEmojiIcon] = useState('😊');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const {user} = useUser();

  const onCreateBudget = async()=>{
      const result = await db.insert(Budgets)
      .values({
        name:name,
        amount:amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon,
      }).returning({insertedId: Budgets.id})

      console.log(result);

      if(result){
        refreshData();
        toast('New Budget Created!')
      }
  }

  return (
    <div>
       
        <Dialog >
          <DialogTrigger asChild>
          <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
            <h2 className='text-3xl'>+</h2>
            <h2>Create New Budget</h2>
          </div>
          </DialogTrigger>
          <DialogContent className='fixed left-[40%] top-[25%] rounded-md w-1/4 flex justify-center items-start gap-3 bg-white'>
            <DialogHeader>
              <DialogTitle>Create A New Budget </DialogTitle>
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
                    onChange={(e) => setName(e.target.value)}/>
                  </div>
                  <div className='mt-2'>
                    <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                    <Input placeholder='e.g. 2000'
                    type ="number"
                    onChange={(e) => setAmount(e.target.value)}/>
                  </div>
                  </div>
                  
              </DialogDescription> 

              <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
              <Button 
                    disabled={!(name&&amount)}
                  className='mt-5 w-full' onClick={onCreateBudget}>Create Budget</Button>
                
              </DialogClose>
            </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        
    </div>
  )
}

export default CreateBudget