import { Button, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPondWaterParam } from '../../../api/pond_fish';

function ViewWaterParam() {
      const {id} = useParams();
      const [waterParam,setWaterParam] = useState({});

      useEffect(()=>{
            getWaterParam();
      },[])

      const getWaterParam = async()=>{
            try {
                 const data =  await getPondWaterParam(id)
                 setWaterParam(data.result)
                 console.log(waterParam)
            } catch (error) {
                  console.log(error)
            }
      }
  return (
    <div>
      <Card sx={{maxWidth:350, margin:'auto',mt:5,boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                  <Typography variant='h4' sx={{
                        backgroundColor:'green',
                        color:'white',
                        textAlign:'center',
                        mb:2,
                        padding:2,
                        border:1}}>
                              Thông số của hồ</Typography>
                  <Typography variant='h5' sx={{ textAlign: 'center', mb: 1, fontWeight: 'bold' }}>{waterParam.pondName}</Typography>
                  <Typography>Ngày tạo: {new Date(waterParam.measurementTime).toLocaleDateString()}</Typography>
                  <Typography>Nhiệt độ: {waterParam.temperature}°C</Typography>
                  <Typography>Độ mặn: {waterParam.salinity}%</Typography>
                  <Typography>Độ pH: {waterParam.ph}</Typography>
                  <Typography>Nồng độ O2: {waterParam.o2}%</Typography>
                  <Typography>Nồng độ NO2: {waterParam.no2}%</Typography>
                  <Typography>Nồng độ NO3: {waterParam.no3}%</Typography>
                  <Typography>Nồng độ PO4: {waterParam.po4}%</Typography>
                  
                  <Button variant='contained' sx={{mt:2}}>Kiểm tra lại thông số</Button>
            </CardContent>
      </Card>
    </div>
  )
}

export default ViewWaterParam