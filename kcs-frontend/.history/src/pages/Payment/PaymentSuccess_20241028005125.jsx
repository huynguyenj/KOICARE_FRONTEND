import React, { useEffect, useState } from "react";

import { verifyPayment } from "../../api/payment";

function PaymentSuccess() {

      
      const [params,setParams] = useState({});
//   useEffect(() => {
//     const param = new URLSearchParams(window.location.search);
//     const params = {};

//     // Populate the params object with the key-value pairs from the URL
//     param.forEach((value, key) => {
//       params[key] = value;
//     });

//     // Log or inspect params to verify it contains all query parameters
;
//   }, []);

    const verifyPayments = async () => {
      try {
      //   const res = await verifyPayment(params);
            const res = 0;
        if (res.code == 0) {
              const formData = localStorage.getItem("orderDetail")
              console.log(formData)
        
        }else{
            console.log(res.result);
            const formData = localStorage.getItem("orderDetail")
            console.log(formData)
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyPayments()
  return <div>PaymentSuccess</div>;
}

export default PaymentSuccess;