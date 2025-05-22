import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BuyerProdNav from './BuyerProdNav';
import './BuyerOrders.css'; 

const BuyerOrders = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userid');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/user-transactions/${userId}`);
        setTransactions(res.data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  return (
    <div style={{ minHeight: '100vh', color: 'white' }}>
      <BuyerProdNav />
      <div className="container py-4">
        <h2 className="mb-4">Recent Transactions</h2>
        {loading ? (
          <p>Loading...</p>
        ) : transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-dark table-hover rounded">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Amount</th>
                  <th>Payment Mode</th>
                  <th>Status</th>
                  <th>Paid At</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn._id}>
                    <td>{txn.transactionId}</td>
                    <td>₹{txn.amount}</td>
                    <td>{txn.paymentMode.toUpperCase()}</td>
                    <td>
                      <span
                        className={`badge ${
                          txn.paymentStatus === 'success'
                            ? 'bg-success'
                            : txn.paymentStatus === 'failed'
                            ? 'bg-danger'
                            : 'bg-warning text-dark'
                        }`}
                      >
                        {txn.paymentStatus.toUpperCase()}
                      </span>
                    </td>
                    <td>{new Date(txn.paidAt).toLocaleString()}</td>
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

export default BuyerOrders;