import { Card } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'

function ViewWaterParam() {
      const {id} = useParams();

  return (
    <div>
      <Card>
            
      </Card>
    </div>
  )
}

export default ViewWaterParam