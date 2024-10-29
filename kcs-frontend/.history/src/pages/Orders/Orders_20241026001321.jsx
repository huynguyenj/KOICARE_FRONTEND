import { useEffect, useState } from 'react';
import './Orders.css'; 

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getAllOrders } from '../../api/shop';




const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    getOrders();
  },[])
  const getOrders = async () =>{
      try {
        const res = await getAllOrders();
        setOrders(res.result)
      } catch (error) {
        console.log(error)
      }
  }
  return (
   <>
   <TableContainer component={Paper}>
   <Table sx={{minWidth:650}} arial-lable="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order Id</TableCell>
            <TableCell align='r'>Số lượng</TableCell>
            <TableCell align='r'>Giá</TableCell>
            <TableCell align='r'>Tên người mua</TableCell>
            <TableCell align='r'>Địa chỉ</TableCell>
            <TableCell align='r'>Số điện thoại</TableCell>
            <TableCell align='r'>Ngày đặt hàng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length> 0? orders.map((order)=>(
            <TableRow key={order.orderId} sx={{}}>
            <TableCell>{order.orderId}</TableCell>
            <TableCell align='right'>{order.quantity}</TableCell>
            <TableCell align='right'>{order.price}</TableCell>
            <TableCell align='right'>{order.userName}</TableCell>
            <TableCell align='right'>{order.address}</TableCell>
            <TableCell align='right'>{order.phone}</TableCell>
            <TableCell align='right'>{new Date(order.date).toLocaleDateString()}</TableCell>
            </TableRow>
          )):""}
        </TableBody>
      </Table>
   </TableContainer>
   </>
  );
};

export default Orders;