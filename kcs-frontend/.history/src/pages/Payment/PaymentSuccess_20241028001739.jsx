import React, { useEffect } from 'react'

import { verifyPayment } from '../../api/payment';

function PaymentSuccess() {

      useEffect(()=>{
            const param = new URLSearchParams(window.location.search)
            const txnRef = param.get('vnp_TxnRef')
           console.log(param)
            const verifyPayments = async ()=>{
                  try {
                        const res = await verifyPayment(txnRef)

                        if(res.reslut=="Payment success!"){
                        //     const formData = localStorage.getItem("orderDetail")
                        //     console.log(formData)
                        console.log("Hello")
                        }
                  } catch (error) {
                        console.log(error)     
                  }
            }
            verifyPayments() 
           
      },[])    
      
return (
    <div>PaymentSuccess</div>
  )
}

export default PaymentSuccess