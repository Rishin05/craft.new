import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

function FooterSidebar() {
    const options=[
        {
            name:'Settings',
            icon:Settings
        },
        {
            name:'Help Center',
            icon:HelpCircle
        },
        {
            name:'My Subscription',
            icon:Wallet
        },
        {
            name:'Log Out',
            icon:LogOut
        }
    ]
  return (
    <div className='p-3 mb-10'>
        {options.map((option,index)=>(
            <Button className='w-full flex justify-start my-3' variant='ghost' key={index}>
                <option.icon/>
                {option.name}
            </Button>
        ))}
    </div>
  )
}

export default FooterSidebar
