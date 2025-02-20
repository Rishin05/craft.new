"use client"

import Lookup from '@/data/Lookup'
import React, { useContext, useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

function PricingModel() {
    const {userDetail,setUserDetail}=useContext(UserDetailContext);
    const [selectedOption,setSelectedOption]=useState()
    const UpdateToken=useMutation(api.users.UpdateToken)
    const onPaymentSuccess=async()=>{
        const token=userDetail?.token+Number(selectedOption?.value)
        console.log(token)
        await UpdateToken({
            token:token,
            userId:userDetail?._id
        })
        setUserDetail(prev=>({
            ...prev,
            token:token
          }))
    }
  return (
   
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {Lookup.PRICING_OPTIONS.map((pricing,index)=>(
            <div key={index} className='border p-4 rounded-lg flex flex-col gap-3' >
                <h2 className='font-bold text-2xl'>{pricing.name}</h2>
                <h2 className='font-medium text-lg'>{pricing.tokens} Tokens</h2>
                <p className='text-gray-400'>{pricing.desc}</p>

                <h2 className='font-bold text-4xl text-center mt-6 items-end'>${pricing.price}</h2>

                <PayPalButtons 
                disabled={!userDetail}
                onClick={()=>{setSelectedOption(pricing)}}
                style={{ layout: "horizontal" }} 
                onApprove={()=>onPaymentSuccess()}
                onCancel={()=>console.log("Payment Canceled")}
                createOrder={(data,actions)=>{
                    return actions.order.create({
                        purchase_units:[
                            {
                                amount:{
                                    value:pricing.price,
                                    currency_code:'USD'
                                }
                            }

                        ]
                    })
                }}/>
            </div>
        ))}
    </div>
  )
}

export default PricingModel
