import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PondWaterParam() {
      const {id} = useParams()
      const [paramHistory, setParamHistory] = useState()
      useEffect(()=>{

      },[])
      const getHistoryParam = () =>{
            try {
                  
            } catch (error) {
                  
            }
      }
  return (
    <div>PondWaterParam</div>
  )
}

export default PondWaterParam