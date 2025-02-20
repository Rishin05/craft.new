import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

function FooterSidebar() {

    const router=useRouter();
    const options=[
        {
            name:'Settings',
            icon:Settings,
            path:'/'
        },
        {
            name:'Help Center',
            icon:HelpCircle
        },
        {
            name:'My Subscription',
            icon:Wallet,
            path:'/pricing'
        },
        {
            name:'Log Out',
            icon:LogOut
        }
    ]

    const onOptionClick=(option)=>{
        router.push(option.path)
    }
  return (
    <div className='p-3 mb-10'>
        {options.map((option,index)=>(
            <Button className='w-full flex justify-start my-3' onClick={()=>onOptionClick(option)} variant='ghost' key={index}>
                <option.icon/>
                {option.name}
            </Button>
        ))}
    </div>
  )
}

export default FooterSidebar
