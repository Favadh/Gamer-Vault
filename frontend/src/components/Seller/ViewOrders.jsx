// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Nav from './Nav';
// import SellerSide from './sellerSide';

// const ViewOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const sellerId = localStorage.getItem("userid");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8000/api/orders?sellerId=${sellerId}`);
//         setOrders(res.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch orders");
//         setLoading(false);
//       }
//     };

//     if (sellerId) {
//       fetchOrders();
//     } else {
//       setError("Seller ID not found");
//       setLoading(false);
//     }
//   }, [sellerId]);

//   if (loading) return <p className="text-white text-center">Loading orders...</p>;
//   if (error) return <p className="text-red-500 text-center">{error}</p>;

//   return (
//     <div>
//         <SellerSide />
//     <div className="container-fluid d-flex justify-content-center text-white mt-5">

//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <div className="overflow-x-auto w-full max-w-6xl">
//           <table className="w-full text-left border border-gray-600 shadow-lg rounded-lg">
//             <thead className="bg-gray-800">
//               <tr>
//                 <th className="border px-4 py-2">Buyer Name</th>
//                 <th className="border px-4 py-2">Buyer Email</th>
//                 <th className="border px-4 py-2">Product Title</th>
//                 <th className="border px-4 py-2">Price</th>
//                 <th className="border px-4 py-2">Transaction ID</th>
//                 <th className="border px-4 py-2">Payment Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order, index) => (
//                 <tr key={index} className="bg-gray-900 hover:bg-gray-800">
//                   <td className="border px-4 py-2">{order.buyer?.username}</td>
//                   <td className="border px-4 py-2">{order.buyer?.email}</td>
//                   <td className="border px-4 py-2">{order.product?.gameTitle || 'N/A'}</td>
//                   <td className="border px-4 py-2">${order.totalPrice}</td>
//                   <td className="border px-4 py-2">{order.transactionId || 'N/A'}</td>
//                   <td className="border px-4 py-2">{order.paymentStatus}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//     </div>
//   );
// };

// export default ViewOrders;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SellerSide from './sellerSide';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sellerId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/orders?sellerId=${sellerId}`);
        console.log("Fetched orders:", res.data);
        setOrders(res.data.allTransactions); // ✅ Fix here
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
        setLoading(false);
      }
    };
  
    if (sellerId) {
      fetchOrders();
    } else {
      setError("Seller ID not found");
      setLoading(false);
    }
  }, [sellerId]);
  

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <SellerSide />

      <div style={{ flex: 1, padding: '20px', color: 'white' }}>
        <h2 style={{color:'white'}} className="text-2xl font-semibold mb-4">Your Orders</h2>

        {loading ? (
          <p className="text-white">Loading orders...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-400">No orders placed.</p>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border border-gray-600 shadow-lg rounded-lg">
              <thead className="bg-gray-800">
                <tr>
                  <th className="border px-4 py-2">Buyer Name</th>
                  <th className="border px-4 py-2">Buyer Email</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Transaction ID</th>
                  <th className="border px-4 py-2">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className="bg-gray-900 hover:bg-gray-800">
                    <td className="border px-4 py-2">{order.buyer?.username}</td>
                    <td className="border px-4 py-2">{order.buyer?.email}</td>
                    <td className="border px-4 py-2">${order.totalPrice}</td>
                    <td className="border px-4 py-2">{order.transactionId || 'N/A'}</td>
                    <td className="border px-4 py-2">{order.paymentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrders;
