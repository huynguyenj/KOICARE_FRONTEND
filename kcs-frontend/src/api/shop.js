import axios from 'axios'
const REST_API_BASE_URL = "http://localhost:8081/shop";

export const addProduct = async (productInfo) => {

      try {
            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }

            const res = await axios.post(REST_API_BASE_URL + '/create', productInfo, {
                  headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                  }
            })
            return res.data;
      } catch (error) {
            console.log("", error)
            throw error
      }
}

export const getAllOrders = async () => {

      try {
            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }

            const res = await axios.get(REST_API_BASE_URL + '/getOrder', {
                  headers: {
                        'Authorization': `Bearer ${token}`,
                  }
            })
            return res.data;
      } catch (error) {
            console.log("", error)
            throw error
      }
}

export const getShopInfo = async () => {

      try {
            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }

            const res = await axios.get(REST_API_BASE_URL + '/getShop', {
                  headers: {
                        'Authorization': `Bearer ${token}`,
                  }
            })
            return res.data;
      } catch (error) {
            console.log("", error)
            throw error
      }
}

export const updateShop = async (shopId, shopInfo) => {

      try {
            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }

            const res = await axios.put(REST_API_BASE_URL + `/updateShop/${shopId}`, shopInfo, {
                  headers: {
                        'Authorization': `Bearer ${token}`,

                  }
            })
            return res.data;
      } catch (error) {
            console.log("", error)
            throw error
      }
}

export const updateOrder = async (orderId, status) => {
      try {
            const token = localStorage.getItem('token');
            if (!token) {
                  throw new Error('Token not found');
            }

            // Ensure orderId is an integer and status is a non-empty string
            if (!Number.isInteger(orderId) || typeof status !== 'string' || !status.trim()) {
                  throw new Error('Invalid input: orderId must be an integer and status a non-empty string');
            }

            const res = await axios.put(
                  `${REST_API_BASE_URL}/updateOrder/${orderId}`,
                  { status }, // JSON payload
                  {
                        headers: {
                              Authorization: `Bearer ${token}`,
                        },
                  }
            );

            return res.data;
      } catch (error) {
            console.error('Error updating order:', error.message);
            throw error; // Re-throw the error for further handling
      }
};

export const deleteOrder = async (orderId) => {
      try {
            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }
            await axios.delete(`http://localhost:8081/order-detail/delete/${orderId}`, {
                  headers: {
                        'Authorization': `Bearer ${token}`,

                  }
            })
      } catch (error) {
            console.log(error)
            throw (error)
      }
}

export const addShop = async (data) => {
      try {
            const token = localStorage.getItem('token')
            if (!token) {
                  throw new Error('Token not find')
            }
            await axios.post(REST_API_BASE_URL + '/createShop', data, {
                  headers: {
                        'Authorization': `Bearer ${token}`,

                  }
            })
      } catch (error) {
            console.log(error)
            throw error
      }
}

